#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import yaml

from datetime import datetime, date

from service_provider.models import *

from .celery_tasks import TasksApi


class ProjectUtils(object):
    # 该工具用在项目信息<保存之后>, 进行一些列有关发消息的操作等等
    def __init__(self, project, data=None):
        self.project = project
        self.data = data

        self.TasksApi = TasksApi

    def set_project_label(self, label):
        project = self.project
        project.label = label
        project.save()
        return

    def set_project_process_detail(self, content):
        # 设置项目进度详细, 例: xxx 日, 进行了 xx 操作
        project = self.project
        detail = ProjectProgressDetailModel()
        detail.project = project
        detail.content = content
        detail.save()
        return

    def admin_confirm_accept_sample(self):
        # 检查是否为管理员确认收样
        project = self.project
        data = self.data
        #
        set_project_label = self.set_project_label
        set_project_process_detail = self.set_project_process_detail
        #
        task_api = self.TasksApi()
        #
        t = 'accept_sample_complete'
        if t in data:
            # 发消息告知用户已经收样
            print '需要发送消息告知用户已经收样'
            content = '已收样'
            task_api.send_msg_to_customer(project, content)
            # 设置 label '已收样'
            label = '已收样'
            set_project_label(label)
            set_project_process_detail(label)
        return

    def send_sample_info_to_yunbio(self):
        # 检查是否含取样日期
        project = self.project
        data = self.data
        #
        set_project_label = self.set_project_label
        set_project_process_detail = self.set_project_process_detail
        #
        task_api = self.TasksApi()
        # 判断此操作为客户保存取样地址
        t = 'take_sample_date'
        tt = 'take_sample_time_confirm'
        v = t in data
        vv = tt not in data
        r = v and vv
        if r:
            # 发消息告知云生物, 客户已经填好取样日期和地址, 正在等待取样
            content = '取样日期....(label 改为, 取样等待中)'
            task_api.send_msg_to_yunbio(project, content)
            # 设置 label '取样等待中'
            label = '取样等待中'
            set_project_label(label)
            set_project_process_detail(label)
        return

    def set_shipment_enterprise(self):
        # 分派物流商
        project = self.project
        data = self.data
        #
        set_project_label = self.set_project_label
        set_project_process_detail = self.set_project_process_detail
        #
        task_api = self.TasksApi()
        #
        t = 'take_sample_time_confirm'
        if t in data:
            # 发消息告知物流商, 客户已经填好取样日期和地址
            content = '取样地址, 日期, 时间'
            task_api.send_msg_to_shipment_enterprise(project, content)
            # 设置 label '取样等待中'
            label = '物流商已安排'
            set_project_label(label)
            set_project_process_detail(label)
        return
