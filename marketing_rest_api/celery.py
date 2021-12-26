"""
This is where you can configure celery tasks, like schedule
"""

from __future__ import absolute_import

import os

from celery import Celery

REDIS_HOST = os.environ.get('REDIS_HOST')
REDIS_PORT = os.environ.get('REDIS_PORT')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'marketing_rest_api.settings')
CELERY_BROKER_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}"

app = Celery('marketin_api')
app.config_from_object('django.conf:settings')
app.conf.broker_url = CELERY_BROKER_URL


@app.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    from api.tasks import collect_campaigns, collect_adsets, collect_ads, resend_failed, cancel_failed
    interval = 60  # every 60sec
    sender.add_periodic_task(interval,
                             collect_campaigns.s(),
                             name='Check Scheduled Tasks(interval={})'.format(interval))

    interval = 75  # every 75sec
    sender.add_periodic_task(interval,
                             collect_adsets.s(),
                             name='Check Scheduled Tasks(interval={})'.format(interval))

    interval = 90  # every 90sec
    sender.add_periodic_task(interval,
                             collect_ads.s(),
                             name='Check Scheduled Tasks(interval={})'.format(interval))

    '''
    This is future works. We can try failed tasks to resend and cancel if exceed to max_retry_count
    Later this can be uncomment.
    '''
    # interval = 60 * 30  # 30 min
    # sender.add_periodic_task(interval,
    #                          resend_failed.s(),
    #                          name='Check Scheduled Tasks(interval={})'.format(interval))
    #
    # interval = 33 * 60  # 33 min
    # sender.add_periodic_task(interval,
    #                          cancel_failed.s(),
    #                          name='Check Scheduled Tasks(interval={})'.format(interval))
