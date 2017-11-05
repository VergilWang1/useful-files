#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .modules.show_project_detail import ShowProjectDetail
from .modules.show_project_samples import ShowProjectSamples
from .modules.show_report import ShowReport
from .modules.show_new_process_step_model import ShowNewProcessStepModel
from .modules.show_new_process_model_detail import ShowNewProcessModelDetail
from .modules.show_project_process_detail import ShowProjectProcessDetail
from .modules.show_new_process_detail import ShowNewProcessDetail
from .modules.show_new_process_step import ShowNewProcessStep


class TwoParamsConfig(object):
    def __init__(self, the_id, unhandled_request):
        self.id = the_id
        self.datas = unhandled_request

        # 载入 module
        # 把生成 datas 的函数载入 config
        m = ShowProjectDetail
        show_project_detail = self._get_module_result(m)

        m = ShowProjectSamples
        show_project_samples = self._get_module_result(m)

        m = ShowReport
        show_report = self._get_module_result(m)

        m = ShowNewProcessStepModel
        show_new_process_step_model = self._get_module_result(m)

        m = ShowNewProcessModelDetail
        show_new_process_model_detail = self._get_module_result(m)

        m = ShowProjectProcessDetail
        show_project_process_detail = self._get_module_result(m)

        m = ShowNewProcessDetail
        show_new_process_detail = self._get_module_result(m)

        m = ShowNewProcessStep
        show_new_process_step = self._get_module_result(m)

        # module 配置
        t = {
            'show_project_detail': show_project_detail,
            'show_project_samples': show_project_samples,
            'show_report': show_report,
            'show_new_process_step_model': show_new_process_step_model,
            'show_new_process_model_detail': show_new_process_model_detail,
            'show_project_process_detail': show_project_process_detail,
            'show_new_process_detail': show_new_process_detail,
            'show_new_process_step': show_new_process_step,
        }
        self.config = t

    def _get_module_result(self, module):
        the_id = self.id
        datas = self.datas
        m = module(the_id, datas)
        r = m.get_main
        return r
