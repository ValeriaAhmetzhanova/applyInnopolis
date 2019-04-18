import unittest
import os
from selenium import webdriver
from selenium.webdriver.firefox.webdriver import WebDriver
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.keys import Keys

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

HOME_URL = "http://localhost:3000/"

PAGE_URLS = [
        HOME_URL + "home",
        HOME_URL + "portfolio",
        HOME_URL + "data",
        HOME_URL + "quiz"
    ]

class TestFrontendTest(unittest.TestCase):
    def test(self):
        web_driver = webdriver.Firefox()
        web_driver.implicitly_wait(10)

        web_driver.get(HOME_URL)
        self.assertEqual(PAGE_URLS[0], web_driver.current_url)

        navigation_links = web_driver.find_elements_by_class_name('nav-link')
        for nav_l in navigation_links:
            nav_l.click()
            page_link = nav_l.get_attribute('href')
            self.assertEqual(page_link, web_driver.current_url)
            test_page_actions(page_link, self, web_driver)

        test_signin(self, web_driver)

        web_driver.close()


def test_signin(test_case: TestFrontendTest, web_driver: WebDriver):
    signin_submit = {
        "username": "oninbo",
        "password": "12345"
    }

    signin_alert_text = 'Username: oninbo Password: 12345'

    signin_button = web_driver.find_element_by_class_name("btn-lg")
    signin_button.click()
    username_input = web_driver.find_element_by_id("username")
    username_input.send_keys(signin_submit["username"])
    password_input = web_driver.find_element_by_id("password")
    password_input.send_keys(signin_submit["password"])
    password_input.send_keys(Keys.RETURN)
    alert = Alert(web_driver)
    test_case.assertEqual(signin_alert_text, alert.text)
    alert.accept()


def test_page_actions(page_url: str, test_case: TestFrontendTest, web_driver: WebDriver):
    data_submit = {
        "date_of_birth": "01.01.1980",
        "gender": "Male",
        "learned_from": "friends",
        "country": "Russia",
        "city": "Moscow",
        "citizenship": "Russia"
    }

    data_alert_text = 'Current State is: {"dateOfBirth":"01.01.1980","gender":"","learned":"friends","country":"Russia","city":"Moscow","citizenship":"Russia"}'

    if page_url == PAGE_URLS[0]:
        pass
    elif page_url == PAGE_URLS[1]:
        upload_button = list(filter(lambda b: b.text == "Upload",
                                    web_driver.find_elements_by_tag_name("button")))[0]
        upload_button.click()
        test_case.assertEqual("Clear", upload_button.text)

    elif page_url == PAGE_URLS[2]:
        date_of_birth_input = web_driver.find_element_by_id("dateOfBirth")
        date_of_birth_input.send_keys(data_submit["date_of_birth"])
        learned_from_input = web_driver.find_element_by_id("learned")
        learned_from_input.send_keys(data_submit["learned_from"])
        country_input = web_driver.find_element_by_id("country")
        country_input.send_keys(data_submit["country"])
        city_input = web_driver.find_element_by_id("city")
        city_input.send_keys(data_submit["city"])
        citizenship_input = web_driver.find_element_by_id("citizenship")
        citizenship_input.send_keys(data_submit["citizenship"])
        submit_button = web_driver.find_element_by_class_name("btn-primary")
        submit_button.click()
        alert = Alert(web_driver)
        test_case.assertEqual(data_alert_text, alert.text)
        alert.accept()

    elif page_url == PAGE_URLS[3]:
        submit_button = web_driver.find_element_by_class_name("btn-primary")
        submit_button.click()
        test_case.assertEqual(page_url + "?answer=test+answer", web_driver.current_url)


if __name__ == "__main__":
    unittest.main()
