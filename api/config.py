"""
This is where you can manage services, url, serializer fields etc.
It very very important file
If you want to add new endpoint for a particular db
Need to defined here.

!! NOTE !!: This file is just for Create, List and Retrieve services.

This file is read by api/urls.py and api/views.py

"""
from rest_framework import serializers

CAMPAIGN = {
    "url": "campaign",
    "db": "CampaignModel",
    "PERMISSIONS": {},
    "FIELD_LIST": ("id", "name", "campaign_id", "objective", "status", "condition"),
    "READ_ONLY_FIELD_LIST": ("campaign_id", "id", "status", "condition")
}

ADSET = {
    "url": "adset",
    "db": "AdSetModel",
    "PERMISSIONS": {},
    "FIELD_LIST": ("id", "name", "daily_budget", "bid", "campaign", "billing_event", "optimization_goal", "status", "condition", "ad_set_id"),
    "EXTRA_FIELDS": {"campaign_name": serializers.CharField(source="campaign.name", required=False)},
    "READ_ONLY_FIELD_LIST": ("id", "status", "condition", "ad_set_id")
}

AD = {
    "url": "ad",
    "db": "AdModel",
    "PERMISSIONS": {},
    "FIELD_LIST": ("id", "ad_set", "name", "status", "condition",
                   "creative_name", "creative_message", "creative_link"),
    "READ_ONLY_FIELD_LIST": ("id", "status", "condition")
}
