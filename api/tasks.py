import logging
import traceback

from django.conf import settings
from django.db.models import F
from facebook_business.adobjects.ad import Ad
from facebook_business.adobjects.adcreative import AdCreative
from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.campaign import Campaign

from api.facebook.facebook_api import facebook_api
from api.facebook.models import CampaignModel, AdSetModel, AdModel
from marketing_rest_api import celery_app

logger = logging.getLogger(__name__)


@celery_app.task
def collect_campaigns(*args, **kwargs):
    """
    Collect the existing Campaigns via facebook api and save it into databases
    """
    # Determine fields
    try:
        name = Campaign.Field.name
        objective = Campaign.Field.objective
        id_ = Campaign.Field.id
        status = Campaign.Field.status

        # Get All Campaigns from Facebook
        campaigns = facebook_api.get_campaigns(
            fields=[name, objective, status])
        # Check if it is in database and insert
        campaign_list = [CampaignModel(name=c.get(name), objective=c.get(objective),
                                       campaign_id=c.get(id_), status=c.get(status),
                                       condition=CampaignModel.Condition.PUBLISHED) for c in
                         campaigns if not CampaignModel.objects.filter(campaign_id=c.get(id_)).exists()]
        if campaign_list:
            CampaignModel.objects.bulk_create(campaign_list)
    except Exception:
        print(traceback.format_exc())


@celery_app.task
def collect_adsets(*args, **kwargs):
    """
    Collect the existing Adsets via facebook api and save it into databases
    """
    try:
        # Determine fields
        name = AdSet.Field.name
        daily_budget = AdSet.Field.daily_budget
        id_ = AdSet.Field.id
        bid = AdSet.Field.bid_amount
        billing_event = AdSet.Field.billing_event
        optimization_goal = AdSet.Field.optimization_goal
        status = AdSet.Field.status
        campaign_id = AdSet.Field.campaign_id

        # Get All Campaigns from Facebook
        ad_sets = facebook_api.get_ad_sets(
            fields=[name, status, daily_budget, bid, billing_event, optimization_goal, campaign_id])

        # Check if it is in database and insert
        ad_set_list = [AdSetModel(name=ad_set.get(name),
                                  daily_budget=ad_set.get(daily_budget),
                                  ad_set_id=ad_set.get(id_),
                                  bid=ad_set.get(bid),
                                  billing_event=ad_set.get(billing_event),
                                  optimization_goal=ad_set.get(optimization_goal),
                                  status=ad_set.get(status),
                                  condition=AdSetModel.Condition.PUBLISHED,
                                  campaign=CampaignModel.objects.get(campaign_id=ad_set.get(campaign_id))
                                  ) for ad_set in
                       ad_sets if not AdSetModel.objects.filter(ad_set_id=ad_set.get(id_)).exists() and
                       CampaignModel.objects.filter(campaign_id=ad_set.get(campaign_id)).exists()]

        if ad_set_list:
            AdSetModel.objects.bulk_create(ad_set_list)
    except:
        print(traceback.format_exc())


@celery_app.task
def collect_ads(*args, **kwargs):
    """
    Collect the existing Ads via facebook api and save it into databases
    """
    # Determine fields
    try:
        name = Ad.Field.name
        creative = Ad.Field.creative
        id_ = Ad.Field.id
        status = Ad.Field.status
        adset_id = Ad.Field.adset_id

        # Get All Campaigns from Facebook
        ads = facebook_api.get_ads(
            fields=[name, creative, status, adset_id])
        creatives = facebook_api.get_ad_creatives(
            fields=[AdCreative.Field.name, AdCreative.Field.object_story_spec])
        ads_list = []
        # To reduce time, convert it to the dict.
        creatives_dict = {c.get('id'): c for c in creatives}

        for ad in ads:
            creative_id = ad.get('creative').get('id')
            adset_id = ad.get('adset_id')
            c = creatives_dict.get(creative_id, None)
            if c and AdSetModel.objects.filter(ad_set_id=adset_id).exists() and not AdModel.objects.filter(
                    ad_id=ad.get('id')).exists():
                creative_name = c.get('name')
                page_id = c.get('object_story_spec', {}).get('page_id', {})
                creative_message = c.get('object_story_spec', {}).get('link_data', {}).get('message')
                creative_link = c.get('object_story_spec', {}).get('link_data', {}).get('link')
                ad_set_id = AdSetModel.objects.get(ad_set_id=adset_id)
                ads_list.append(
                    AdModel(ad_id=ad.get(id_), ad_set_id=ad_set_id.id, name=ad.get(name), status=ad.get(status),
                            creative_id=creative_id,
                            creative_name=creative_name, page_id=page_id, condition=AdModel.Condition.PUBLISHED,
                            creative_message=creative_message, creative_link=creative_link))

        if ads_list:
            AdModel.objects.bulk_create(ads_list)
    except:
        print(traceback.format_exc())


@celery_app.task
def resend_failed(*args, **kwargs):
    """
    """
    campaign_list = CampaignModel.objects.filter(condition=CampaignModel.Condition.FAILED,
                                                 retry_count__lt=settings.MAX_RETRY)
    campaign_list.update(retry_count=F('retry_count') + 1)
    for campaign in campaign_list:
        campaign.create_api()

    adset_list = AdSetModel.objects.filter(condition=AdSetModel.Condition.FAILED,
                                           retry_count__lt=settings.MAX_RETRY)
    adset_list.update(retry_count=F('retry_count') + 1)
    for adset in adset_list:
        adset.create_api()


@celery_app.task
def cancel_failed(*args, **kwargs):
    CampaignModel.objects.filter(condition=CampaignModel.Condition.FAILED,
                                 retry_count__gte=settings.MAX_RETRY).update(
        condition=CampaignModel.Condition.CANCELED)

    AdSetModel.objects.filter(condition=AdSetModel.Condition.FAILED,
                              retry_count__gte=settings.MAX_RETRY).update(
        condition=CampaignModel.Condition.CANCELED)
