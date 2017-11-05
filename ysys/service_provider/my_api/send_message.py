#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime
from ..models import *

from .handle_obj import HandleObj


class Message(object):
    def __init__(self):
        self.ProjectModel = ProjectModel
        self.ProjectStatusTitleModel = ProjectStatusTitleModel
        self.ProjectStateModel = ProjectStateModel
        self.ProjectProgressDetailModel = ProjectProgressDetailModel

        self.HandleObj = HandleObj

        self.code_1 = 'title'
        self.code_2 = 'state'
        self.code_3 = 'detail'

    def send(self, project_id, obj_code, message_code, user_define_message=False):
        project = self.ProjectModel
        handle_obj = self.HandleObj()

        model_config = self._get_model_config()
        message_config = self._get_message_config()

        pid = project_id
        oc = obj_code
        mc = message_code
        user_define = user_define_message

        t = model_config[oc]
        o = t()
        if user_define:
            m = mc
        else:
            t = message_config[oc]
            m = t[mc]
        date = datetime.now()
        p = project.objects.get(id=pid)
        t = {
            'content': m,
            'date': date,
            'project': p,
        }
        handle_obj.save_new_instance(o, t)
        return

    def _get_model_config(self):
        c1 = self.code_1
        c2 = self.code_2
        c3 = self.code_3
        m1 = self.ProjectStatusTitleModel
        m2 = self.ProjectStateModel
        m3 = self.ProjectProgressDetailModel
        t = {
            c1: m1,
            c2: m2,
            c3: m3,
        }
        return t

    def _get_message_config(self):
        c1 = self.code_1
        c2 = self.code_2
        c3 = self.code_3
        config_1 = self._get_title_config()
        config_2 = self._get_state_config()
        config_3 = self._get_detail_config()
        t = {
            c1: config_1,
            c2: config_2,
            c3: config_3,
        }
        return t

    def _get_title_config(self):
        t = {}
        k1 = '1'
        k2 = '2'
        k3 = '3'
        k4 = '4'
        k5 = '5'
        k6 = '6'
        k7 = '7'
        k8 = '8'
        k9 = '9'
        k10 = '10'
        t[k1] = '项目已创建'
        t[k2] = '取样等待中'
        t[k3] = '服务商已安排'
        t[k4] = '取样中'
        t[k5] = '已收样'
        t[k6] = '质检中'
        t[k7] = '核查中'
        t[k8] = '预实验中'
        t[k9] = '正式实验中'
        t[k10] = '项目结束'
        return t

    def _get_state_config(self):
        t = {}
        k1 = '1'
        k2 = '2'
        k3 = '3'
        k4 = '4'
        k5 = '5'
        k6 = '6'
        k7 = '7'
        t[k1] = '项目创建'
        t[k2] = '取样等待'
        t[k3] = '运输中'
        t[k4] = '质检'
        t[k5] = '预实验'
        t[k6] = '正式实验'
        t[k7] = '项目完成'
        return t

    def _get_detail_config(self):
        t = {}
        k1 = '1'
        k2 = '2'
        k3 = '3'
        k4 = '4'
        k5 = '5'
        k6 = '6'
        k7 = '7'
        t[k1] = '项目已创建'
        t[k2] = '取样等待'
        t[k3] = '服务商已安排'
        t[k4] = '物流商已安排'
        t[k5] = '取样中'
        t[k6] = '已收样'
        t[k7] = '质检中'
        return t
