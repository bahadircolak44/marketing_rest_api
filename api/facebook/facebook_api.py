from django.conf import settings
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.api import FacebookAdsApi

FacebookAdsApi.init(settings.MY_APP_ID, settings.MY_APP_SECRET, settings.MY_ACCESS_TOKEN)
facebook_api = AdAccount(settings.AD_ACCOUNT_ID)