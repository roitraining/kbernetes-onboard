import main
import unittest
import json

class mainTestCase(unittest.TestCase):

    def test_health(self):
        main.app.testing = True
        client = main.app.test_client()

        r = client.get('/health')
        assert r.status_code == 200
        data = json.loads(r.data)
        assert data == []

if __name__ == '__main__':
    unittest.main()