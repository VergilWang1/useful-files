#!/usr/bin/env python
# -*- coding: utf-8 -*-


from .modules.upload_report import UploadReport
from .modules.upload_sample import UploadSample
from .modules.create_new_process_step_model import CreateNewProcessStepModel
from .modules.save_project_info import SaveProjectInfo
from .modules.report_confirm import ReportConfirm
from .modules.reset_project import ResetProject


class TwoParamsConfigPost(object):
    def __init__(self, the_id, unhandled_request):
        self.id = the_id
        self.datas = unhandled_request

        # 载入 module
        # 把生成 datas 的函数载入 config
        m = UploadReport
        upload_report = self._get_module_result(m)

        m = UploadSample
        upload_sample = self._get_module_result(m)

        m = CreateNewProcessStepModel
        create_new_process_step_model = self._get_module_result(m)

        m = SaveProjectInfo
        save_project_info = self._get_module_result(m)

        m = ReportConfirm
        report_confirm = self._get_module_result(m)

        m = ResetProject
        reset_project = self._get_module_result(m)

        # module 配置
        t = {
            'upload_report': upload_report,
            'upload_sample': upload_sample,
            'create_new_process_step_model': create_new_process_step_model,
            'save_project_info': save_project_info,
            'report_confirm': report_confirm,
            'reset_project': reset_project,
        }
        self.config = t

    def _get_module_result(self, module):
        the_id = self.id
        datas = self.datas
        m = module(the_id, datas)
        r = m.get_main
        return r
