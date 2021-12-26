export const CAMPAIGN_COLUMNS = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Name', flex: 1},
    {field: 'campaign_id', headerName: 'Campaign ID', flex: 1},
    {field: 'objective', headerName: 'Objective', width: 130},
    {field: 'status', headerName: 'Status', width: 130},
    {field: 'condition', headerName: 'Condition', width: 130},
]

export const ADSET_COLUMNS = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'ad_set_id', headerName: 'AdSet ID', width: 70},
    {field: 'name', headerName: 'Name', flex: 1},
    {field: 'campaign_name', headerName: 'Campaign', flex: 1},
    {field: 'daily_budget', headerName: 'Daily Budget', width: 130},
    {field: 'bid', headerName: 'BID', width: 70},
    {field: 'billing_event', headerName: 'Billing Event', width: 130},
    {field: 'optimization_goal', headerName: 'Optimization Goal', width: 130},
    {field: 'status', headerName: 'Status', width: 130},
    {field: 'condition', headerName: 'Condition', width: 130},
]


export const AD_COLUMNS = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'ad_set', headerName: 'AdSet', width: 130 },
    { field: 'creative_name', headerName: 'Creative Name', flex: 1 },
    { field: 'creative_message', headerName: 'Creative Message', width: 200 },
    { field: 'creative_link', headerName: 'Creative Link', width: 130 },
    {field: 'status', headerName: 'Status', width: 130},
    {field: 'condition', headerName: 'Condition', flex: 1},
]

export const INSIGHT_COLUMNS = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'adset_id', headerName: 'AdSet', flex: 1 },
    { field: 'impressions', headerName: 'Impressions', flex: 1 },
    { field: 'spend', headerName: 'Spend', flex: 1 },
    { field: 'actions', headerName: 'Actions', flex: 1 },
    {field: 'clicks', headerName: 'Clicks', flex: 1},
    {field: 'frequency', headerName: 'Frequency', flex: 1},
]

export const OBJECTIVE_ENUM = [
    {value: 'APP_INSTALLS', label: 'App Installs'},
    {value: 'BRAND_AWARENESS', label: 'Brand Awareness'},
    {value: 'CONVERSIONS', label: 'Conversions'},
    {value: 'EVENT_RESPONSES', label: 'Event Responses'},
    {value: 'LEAD_GENERATION', label: 'Lead Generation'},
    {value: 'LINK_CLICKS', label: 'Link Clicks'},
    {value: 'LOCAL_AWARENESS', label: 'Local Awareness'},
    {value: 'MESSAGES', label: 'Messages'},
    {value: 'OFFER_CLAIMS', label: 'Offer Claims'},
    {value: 'PAGE_LIKES', label: 'Page Likes'},
    {value: 'POST_ENGAGEMENT', label: 'Post Engagement'},
    {value: 'PRODUCT_CATALOG_SALES', label: 'Product Catalog Sales'},
    {value: 'REACH', label: 'Reach'},
    {value: 'STORE_VISITS', label: 'Store Visits'},
    {value: 'VIDEO_VIEWS', label: 'Video Views'},
]


export const BILLING_EVENT_ENUM = [
    {value: 'IMPRESSIONS', label: 'Impressions'},
    // {value: 'APP_INSTALLS', label: 'App Installs'},
    // {value: 'CLICKS', label: 'Clicks'},
    // {value: 'LINK_CLICKS', label: 'Link Clicks'},
    // {value: 'LISTING_INTERACTION', label: 'Listing Interaction'},
    // {value: 'NONE', label: 'None'},
    // {value: 'OFFER_CLAIMS', label: 'Offer Claims'},
    // {value: 'PAGE_LIKES', label: 'Page Likes'},
    // {value: 'POST_ENGAGEMENT', label: 'Post Engagement'},
    // {value: 'PURCHASE', label: 'Purchase'},
    // {value: 'THRUPLAY', label: 'Thruplay'},
]

export const OPTIMIZATION_GOAL_ENUM = [
    {value: 'IMPRESSIONS', label: 'Impressions'},
    {value: 'REACH', label: 'Reach'},
    // {value: 'AD_RECALL_LIFT', label: 'Ad Recall Lift'},
    // {value: 'APP_INSTALLS', label: 'App Installs'},
    // {value: 'APP_INSTALLS_AND_OFFSITE_CONVERSIONS', label: 'App Installs And Offsite Conversions'},
    // {value: 'CONVERSATIONS', label: 'Conversations'},
    // {value: 'DERIVED_EVENTS', label: 'Derived Events'},
    // {value: 'ENGAGED_USERS', label: 'Engaged Users'},
    // {value: 'EVENT_RESPONSES', label: 'Event Responses'},
    // {value: 'LANDING_PAGE_VIEWS', label: 'Landing Page Views'},
    // {value: 'LEAD_GENERATION', label: 'Lead Generation'},
    // {value: 'LINK_CLICKS', label: 'Link Clicks'},
    // {value: 'NONE', label: 'None'},
    // {value: 'OFFSITE_CONVERSIONS', label: 'Offsite Conversions'},
    // {value: 'PAGE_LIKES', label: 'Page Likes'},
    // {value: 'POST_ENGAGEMENT', label: 'Post Engagement'},
    // {value: 'QUALITY_CALL', label: 'Quality Call'},
    // {value: 'QUALITY_LEAD', label: 'Quality Lead'},
    // {value: 'THRUPLAY', label: 'Thruplay'},
    // {value: 'VALUE', label: 'Value'},
    // {value: 'VISIT_INSTAGRAM_PROFILE', label: 'Visit Instagram_profile'},
]

































