from rest_framework import status
from rest_framework.test import APITestCase

from api import config

url_list = []
for k, v in config.__dict__.items():
    if '__' not in k and 'serializers' not in k:
        url_list.append(f"/api/v1/facebook/{v.get('url')}/")


class EndpointTests(APITestCase):

    def test_apis(self):
        print()
        print()
        for url in url_list:
            print("+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*")
            print('Testing:  [GET]', url)
            self.get_test(url)

        print("+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*")
        print('\n')

    def get_test(self, url):
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
