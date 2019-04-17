import unittest
from selenium import webdriver

HOME_URL = "http://localhost:3000/"

class TestFrontend(unittest.TestCase):
    def test(self):
        web_driver = webdriver.Firefox()
        web_driver.implicitly_wait(10)

        web_driver.get(HOME_URL)
        self.assertEqual(HOME_URL + "home", web_driver.current_url)
        web_driver.close()

if __name__ == "__main__":
    unittest.main()