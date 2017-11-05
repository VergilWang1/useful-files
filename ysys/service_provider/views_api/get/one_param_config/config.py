#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .modules.show_projects import ShowProjects
from .modules.show_new_process_model import ShowNewProcessModel
from .modules.show_system_contact import ShowSystemContact


class OneParamConfig(object):
    def __init__(self, unhandled_request):
        self.datas = unhandled_request

        # 载入 module
        # 把生成 datas 的函数载入 config
        m = ShowProjects
        show_projects = self._get_module_result(m)

        m = ShowNewProcessModel
        show_new_process_model = self._get_module_result(m)

        m = ShowSystemContact
        show_system_contact = self._get_module_result(m)

        # module 配置
        t = {
            'show_projects': show_projects,
            'show_new_process_model': show_new_process_model,
            'show_system_contact': show_system_contact,
        }
        self.config = t

    def _get_module_result(self, module):
        datas = self.datas
        m = module(datas)
        r = m.get_main
        return r
