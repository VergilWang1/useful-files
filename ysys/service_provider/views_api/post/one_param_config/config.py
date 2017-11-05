#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .modules.create_new_process_model import CreateNewProcessModel
from .modules.create_project import CreateProject
from .modules.save_new_process_model import SaveNewProcessModel
from .modules.save_new_process_step_model import SaveNewProcessStepModel
from .modules.save_new_process import SaveNewProcess
from .modules.save_new_process_step import SaveNewProcessStep
from .modules.save_system_contact import SaveSystemContact


class OneParamConfigPost(object):
    def __init__(self, unhandled_request):
        self.datas = unhandled_request

        # 载入 module
        # 把生成 datas 的函数载入 config
        m = CreateNewProcessModel
        create_new_process_model = self._get_module_result(m)

        m = CreateProject
        create_project = self._get_module_result(m)

        m = SaveNewProcessModel
        save_new_process_model = self._get_module_result(m)

        m = SaveNewProcessStepModel
        save_new_process_step_model = self._get_module_result(m)

        m = SaveNewProcess
        save_new_process = self._get_module_result(m)

        m = SaveNewProcessStep
        save_new_process_step = self._get_module_result(m)

        m = SaveSystemContact
        save_system_contact = self._get_module_result(m)

        # module 配置
        t = {
            'create_new_process_model': create_new_process_model,
            'create_project': create_project,
            'save_new_process_model': save_new_process_model,
            'save_new_process_step_model': save_new_process_step_model,
            'save_new_process': save_new_process,
            'save_new_process_step': save_new_process_step,
            'save_system_contact': save_system_contact,
        }
        self.config = t

    def _get_module_result(self, module):
        datas = self.datas
        m = module(datas)
        r = m.get_main
        return r
