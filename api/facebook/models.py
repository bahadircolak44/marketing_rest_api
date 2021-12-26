import random
import traceback
from base64 import b64encode

from django.conf import settings
from django.db import models
from facebook_business.adobjects.ad import Ad
from facebook_business.adobjects.adimage import AdImage
from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.campaign import Campaign
from facebook_business.adobjects.targeting import Targeting
from rest_framework.response import Response

from api.facebook.facebook_api import facebook_api
from utils.base_model import BaseModel


class CampaignModel(BaseModel):
    OBJECTIVE_ENUMS = [(value, value) for key, value in Campaign.Objective.__dict__.items() if
                       not key.startswith('__') or not key.endswith('__')]
    STATUS_ENUMS = [(value, value) for key, value in Campaign.StatusOption.__dict__.items() if
                    not key.startswith('__') or not key.endswith('__')]

    class Condition(models.TextChoices):
        IDLE = 'IDLE'
        WAITING = 'WAITING'
        PUBLISHED = 'PUBLISHED'
        FAILED = 'FAILED'
        CANCELED = 'CANCELED'

    campaign_id = models.CharField(max_length=256)
    name = models.CharField(max_length=200)
    objective = models.CharField(max_length=64, default=Campaign.Objective.reach,
                                 choices=OBJECTIVE_ENUMS)
    status = models.CharField(max_length=32, choices=STATUS_ENUMS, default=Campaign.StatusOption.paused)
    condition = models.CharField(max_length=32, choices=Condition.choices, default=Condition.IDLE)

    error_payload = models.TextField()
    retry_count = models.IntegerField(default=0)

    class Meta:
        db_table = 'db_campaign'

    def create_api(self):
        try:
            campaign = facebook_api.create_campaign(params={
                'name': f"Conversions Campaign {self.name}",
                'special_ad_categories': ['NONE'],
                'objective': self.objective,
                'status': self.status,
            })
        except Exception:
            print(traceback.format_exc())
            self.condition = self.Condition.FAILED
            self.error_payload = traceback.format_exc()
            print('[ERROR] Problem Occured While Creating Campaign')
        else:
            self.campaign_id = campaign.get('id')
            self.name = f"Conversions Campaign {self.name}"
            self.condition = self.Condition.PUBLISHED
            print('[SUCCESS] Campaign created')
        finally:
            self.save()


class AdSetModel(BaseModel):
    BILLING_EVENT_ENUMS = [(value, value) for key, value in AdSet.BillingEvent.__dict__.items() if
                           not key.startswith('__') or not key.endswith('__')]

    OPTIMIZATION_GOAL_ENUMS = [(value, value) for key, value in AdSet.OptimizationGoal.__dict__.items() if
                               not key.startswith('__') or not key.endswith('__')]

    TARGETING_ENUMS = [(value, value) for key, value in Targeting.Field.__dict__.items() if
                       not key.startswith('__') or not key.endswith('__')]

    STATUS_ENUMS = [(value, value) for key, value in AdSet.StatusOption.__dict__.items() if
                    not key.startswith('__') or not key.endswith('__')]

    class Condition(models.TextChoices):
        IDLE = 'IDLE'
        WAITING = 'WAITING'
        PUBLISHED = 'PUBLISHED'
        FAILED = 'FAILED'
        CANCELED = 'CANCELED'

    ad_set_id = models.CharField(max_length=256)
    campaign = models.ForeignKey(CampaignModel, on_delete=models.CASCADE, related_name='adsets')
    name = models.CharField(max_length=256)
    daily_budget = models.CharField(max_length=64, default="2000")
    bid = models.CharField(max_length=64, default="5")
    billing_event = models.CharField(max_length=64, choices=BILLING_EVENT_ENUMS)
    optimization_goal = models.CharField(max_length=64,
                                         choices=OPTIMIZATION_GOAL_ENUMS)
    targeting = models.TextField(default=repr({"geo_locations": {"countries": ["AE", "SA", "KW"]},
                                               "age_min": 20, "age_max": 35}, ))

    status = models.CharField(max_length=32, choices=STATUS_ENUMS, default=AdSet.StatusOption.paused)
    condition = models.CharField(max_length=32, choices=Condition.choices, default=Condition.IDLE)

    error_payload = models.TextField()
    retry_count = models.IntegerField(default=0)

    class Meta:
        db_table = 'db_ad_set'

    def create_api(self):
        try:
            ad_set = facebook_api.create_ad_set(params={
                "name": f"My first AdSet {self.name}",
                'campaign_id': self.campaign.campaign_id,
                'daily_budget': self.daily_budget,
                'billing_event': self.billing_event,
                'optimization_goal': self.optimization_goal,
                'bid_amount': self.bid,
                'targeting': eval(self.targeting),
                'status': self.status
            })
        except Exception:
            print(traceback.format_exc())
            self.condition = self.Condition.FAILED
            self.error_payload = traceback.format_exc()
            print('[ERROR] Problem Occured While Creating AdSet')
        else:
            self.ad_set_id = ad_set.get('id')
            self.name = f"My first AdSet {self.name}"
            self.condition = self.Condition.PUBLISHED
            print('[SUCCESS] AdSet created')
        finally:
            self.save()

    @classmethod
    def insights(cls, *args, **kwargs):
        """
        Later, another models want to consume message, so the method is generic.
        Just defined it in Model which is inherited BaseModel.
        In the views.py this method will be called by consume()
        """
        try:
            insights = facebook_api.get_insights(
                fields=[
                    "adset_id",
                    "impressions",
                    "spend",
                    "actions",
                    "clicks",
                    "frequency"
                ]
            )
        except:
            print(traceback.format_exc())
            insights = None

        if not insights:
            ad_set_list = cls.objects.all()
            insights_mock = [{
                'id': ad_set.id,
                'adset_id': ad_set.ad_set_id,
                'name': ad_set.name,
                "impressions": random.randint(500, 50000),
                "spend": random.randint(500, 50000),
                "actions": random.randint(50, 5000),
                "clicks": random.randint(50, 4000),
                "frequency": random.randint(5, 100)
            } for ad_set in ad_set_list]

            return Response(insights_mock)
        return Response(insights)


class AdModel(BaseModel):
    STATUS_ENUMS = [(value, value) for key, value in Ad.StatusOption.__dict__.items() if
                    not key.startswith('__') or not key.endswith('__')]

    ad_id = models.CharField(max_length=64)
    ad_set = models.ForeignKey(AdSetModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    creative_name = models.CharField(max_length=256)
    page_id = models.CharField(max_length=64, default=settings.PAGE_ID)
    creative_message = models.TextField()
    creative_link = models.TextField()

    creative_id = models.CharField(max_length=64, default='')
    status = models.CharField(max_length=32, choices=STATUS_ENUMS, default=Ad.StatusOption.paused)
    condition = models.CharField(max_length=32, choices=BaseModel.Condition.choices, default=BaseModel.Condition.IDLE)

    error_payload = models.TextField()
    retry_count = models.IntegerField(default=0)

    class Meta:
        db_table = 'db_ad'

    def create_api(self, *args, **kwargs):

        try:
            image = facebook_api.create_ad_image(params={
                AdImage.Field.filename: settings.BASE_DIR / 'api/facebook/gucci-bag.jpg'
            })
            creative = facebook_api.create_ad_creative(
                fields=[
                    'object_story_spec'
                ],
                params={
                    'name': self.creative_name,
                    'status': self.status,
                    'object_story_spec': {
                        'page_id': self.page_id,
                        'link_data': {
                            'message': self.creative_message,
                            'image_hash': image[AdImage.Field.hash],
                            'link': self.creative_link,
                            'call_to_action': {
                                'type': 'LIKE_PAGE'
                            }
                        },
                    }
                },
            )
            self.creative_id = creative.get('id')
            ad = facebook_api.create_ad(params={
                'name': self.name,
                'adset_id': self.ad_set.ad_set_id,
                'creative': creative,
                'status': self.status,
            })
        except Exception:
            print(traceback.format_exc())
            self.condition = self.Condition.FAILED
            self.error_payload = traceback.format_exc()
            print('[ERROR] Problem Occured While Creating Ad')

        else:
            self.ad_id = ad.get('id')
            self.condition = self.Condition.PUBLISHED
            print('[SUCCESS] Ad created')

        finally:
            self.save()

    @classmethod
    def preview(cls, *args, **kwargs):
        try:
            ad_objects = AdModel.objects.all()
            response_obj = []
            for ad in ad_objects:
                preview = facebook_api.get_generate_previews(params={
                    'creative': {"id": ad.creative_id},
                    'ad_format': 'DESKTOP_FEED_STANDARD',
                    'width': 1500,
                    "height": 250
                })
                body = {'body': b64encode(preview[0].get('body').encode()).decode(),
                        'name': ad.creative_name}
                response_obj.append(body)
        except:
            print(traceback.format_exc())
            response_obj = []

        return Response(response_obj)