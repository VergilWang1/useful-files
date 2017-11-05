#!/usr/bin/env python
# -*- coding: utf-8 -*-

import yaml

from datetime import datetime
from django.contrib.auth.models import User, Group, Permission
from .....models import *

from .....my_api.handle_obj import HandleObj
from .....my_api.my_email import Email
from .....my_api.project_utils import ProjectUtils


class ResetProject(object):
    def __init__(self, id_1, unhandled_request):
        self.id_1 = id_1
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj
        self.Email = Email
        self.ProjectUtils = ProjectUtils

        # 载入 django models
        self.ProjectModel = ProjectModel
        self.User = User

    def get_main(self):
        project_id = self.id_1
        source_datas = self.unhandled_request.POST

        project_obj = self.ProjectModel
        user_obj = self.User

        h = self.HandleObj()
        e = self.Email()

        reset_project_attr = self._reset_project_attr
        reset_samples = self._reset_samples
        reset_report = self._reset_report
        add_project_process_detail = self._add_project_process_detail

        # 初始化信息
        success = ''
        fail = ''
        message = ''
        data = ''

        project = project_obj.objects.get(id=project_id)
        # 重置项目属性
        reset_project_attr(project)
        # 重置 samples
        reset_samples(project)
        # 重置 report
        reset_report(project)
        # 添加项目进度详情
        add_project_process_detail(project)

        try:
            success = True
        except:
            fail = True

        r = {
            'success': success,
            'fail': fail,
            'message': message,
            'data': data,
        }
        return r

    def _reset_project_attr(self, project):
        project.sampling_address = None
        project.take_sample_date = None
        project.take_sample_time = None
        project.take_sample_time_confirm = False
        project.take_sample_complete = False
        project.accept_sample_date = None
        project.accept_sample_time = None
        project.accept_sample_complete = False
        project.customer_id = None
        project.service_provider_id = None
        project.shipment_enterprise_id = None
        project.new_process = None
        project.label = '项目已创建'
        project.complete = False
        project.save()
        return

    def _add_project_process_detail(self, project):
        proj_utils = self.ProjectUtils(project)
        content = '重新备样'
        proj_utils.set_project_process_detail(content)
        return

    def _reset_samples(self, project):
        samples = project.sample.filter(active=True)
        for i in samples:
            i.active = False
            i.save()
        return

    def _reset_report(self, project):
        reports = project.report.filter(active=True)
        for i in reports:
            i.active = False
            i.save()
        return
