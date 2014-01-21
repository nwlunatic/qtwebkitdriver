from unittest import expectedFailure

from contesto.basis.test_case import UnittestContestoTestCase as ContestoTestCase
from contesto.basis.driver_mixin import QtWebkitDriver
from contesto import config

import platform

if platform.system() == 'Linux':
    config.add_config_file('./linux_config.ini')
elif platform.system() == 'Darwin':
    config.add_config_file('./mac_config.ini')
elif platform.system() == 'Windows':
    config.add_config_file('./win_config.ini')
else:
    raise Exception('cant define OS you running.')


class QtWebKitTestCase(ContestoTestCase, QtWebkitDriver):
    pass


class MouseActionsTest(QtWebKitTestCase):
    def test_click_button(self):
        button = self.driver.find_element_by_id('button')
        button.click()
        result = self.driver.find_element_by_id('result')
        self.assertEqual(u'button', result.text)

    def test_list_going_to_bring_element_to_view(self):
        link = self.driver.find_elements_by_class_name('link')[17]
        link.click()
        result = self.driver.find_element_by_id('result')
        self.assertEqual(u'link17', result.text)

    # drag and drop need to be done with mousemove event
    def test_drag_and_drop(self):
        drag_object = self.driver.find_element_by_id('drag_object')
        from selenium.webdriver.common.action_chains import ActionChains
        ActionChains(self.driver).\
            move_to_element(drag_object).\
            click_and_hold().\
            move_by_offset(0, 200).\
            release().\
            perform()
        result = self.driver.find_element_by_id('result')
        self.assertEqual(u'0,200', result.text)

    def test_click_right_mouse_button(self):
        click_tester = self.driver.find_element_by_id('click_tester')
        # # we can't really focus to div, so we need to work with input dom element
        # input_element = _input_div.find_element_by_tag_name('input')
        from selenium.webdriver.common.action_chains import ActionChains
        ActionChains(self.driver).\
            move_to_element(click_tester).\
            context_click().\
            perform()
        result = self.driver.find_element_by_id('result')
        self.assertEqual(u'2', result.text)


class KeyActionsTest(QtWebKitTestCase):
    def test_characters_input(self):
        from selenium.webdriver.common.keys import Keys
        _input_div = self.driver.find_element_by_id('input')
        # we can't really focus to div, so we need to work with input dom element
        input_element = _input_div.find_element_by_tag_name('input')
        input_element.send_keys('test')
        input_element.send_keys(Keys.ENTER)
        result = self.driver.find_element_by_id('result')
        self.assertEqual('test', result.text)

    def test_copy_paste(self):
        from selenium.webdriver.common.keys import Keys
        _input_div = self.driver.find_element_by_id('input')
        # we can't really focus to div, so we need to work with input dom element
        input_element = _input_div.find_element_by_tag_name('input')
        input_element.send_keys('test')
        input_element.send_keys(Keys.CONTROL, 'a')
        input_element.send_keys(Keys.CONTROL, 'x')
        input_element.send_keys('123')
        input_element.send_keys(Keys.CONTROL, 'a')
        input_element.send_keys(Keys.CONTROL, 'v')
        input_element.send_keys(Keys.ENTER)
        result = self.driver.find_element_by_id('result')
        self.assertEqual('test', result.text)


class FindElementTest(QtWebKitTestCase):
    def test_find_element_by_id(self):
        button = self.driver.find_element_by_id('button')
        from contesto.core.element import ContestoWebElement
        self.assertIsInstance(button, ContestoWebElement)

    # elementS? what? anyway...
    def test_find_elements_by_id(self):
        buttons = self.driver.find_elements_by_id('button')
        from contesto.core.element import ContestoWebElement
        self.assertEqual(1, len(buttons))
        button = buttons[0]
        self.assertIsInstance(button, ContestoWebElement)
        self.assertEqual(u'button', button.text)

    def test_find_element_by_css_selector(self):
        button = self.driver.find_element_by_css_selector('#button')
        from contesto.core.element import ContestoWebElement
        self.assertIsInstance(button, ContestoWebElement)

    def test_find_elements_by_css_selector(self):
        links = self.driver.find_elements_by_class_name('link')
        from contesto.core.element import ContestoWebElement
        self.assertEqual(20, len(links))
        for number, link in enumerate(links):
            self.assertIsInstance(link, ContestoWebElement)
            self.assertEqual(u'link' + unicode(number), link.text)

    def test_find_element_by_xpath(self):
        button = self.driver.find_element_by_xpath('//*[@id="button"]')
        from contesto.core.element import ContestoWebElement
        self.assertIsInstance(button, ContestoWebElement)

    def test_find_elements_by_xpath(self):
        links = self.driver.find_elements_by_xpath('//*[contains(@class, "link")]')
        from contesto.core.element import ContestoWebElement
        self.assertEqual(20, len(links))
        for number, link in enumerate(links):
            self.assertIsInstance(link, ContestoWebElement)
            self.assertEqual(u'link' + unicode(number), link.text)

    def test_find_element_by_class_name(self):
        link = self.driver.find_element_by_class_name('link')
        from contesto.core.element import ContestoWebElement
        self.assertIsInstance(link, ContestoWebElement)
        self.assertEqual(u'link0', link.text)

    def test_find_elements_by_class_name(self):
        links = self.driver.find_elements_by_class_name('link')
        from contesto.core.element import ContestoWebElement
        self.assertEqual(20, len(links))
        for number, link in enumerate(links):
            self.assertIsInstance(link, ContestoWebElement)
            self.assertEqual(u'link' + unicode(number), link.text)