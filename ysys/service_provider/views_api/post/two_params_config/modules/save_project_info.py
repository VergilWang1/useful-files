#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime
from django.contrib.auth.models import User

from .....my_api.handle_obj import HandleObj
from .....my_api.project_utils import ProjectUtils
from .....models import *


class SaveProjectInfo(object):
    def __init__(self, id_1, unhandled_request):
        self.id_1 = id_1
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj
        self.ProjectUtils = ProjectUtils

        # 载入 django models
        self.ProjectModel = ProjectModel

    def get_main(self):
        project_id = self.id_1
        source_datas = self.unhandled_request.POST

        h = self.HandleObj()

        project_class = self.ProjectModel

        save_info = self._save_info

        # 初始化 response
        success = ''
        fail = ''
        message = ''
        data = ''

        project = project_class.objects.get(id=project_id)

        k = 'save'
        save = h.loads_json_datas(k, source_datas)

        try:
            # 保存项目信息
            save_info(project, save)

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

    def _save_info(self, project, datas):
        h = self.HandleObj()

        handle_info = self._handle_info

        save = datas
        for i in save:
            # 保存项目信息
            h.save_new_instance(project, i)
            print 'i:', i
            # 根据保存信息的内容, 做出一些操作
            handle_info(project, i)
        return

    def _handle_info(self, project, data):
        # 根据保存信息的内容, 做出一些操作
        p = self.ProjectUtils(project, data)
        # 管理员确认收样
        p.admin_confirm_accept_sample()
        # 把客户填写的取样信息发给云生物
        p.send_sample_info_to_yunbio()
        # 分派物流商
        p.set_shipment_enterprise()
        return

    # def _send_message_to_yunbio(self, project, data):
    #     # 此功能可以单独做成一个接口
    #     h = self.HandleObj()
    #     # 检查是否含取样日期
    #     t = 'take_sample_date'
    #     if t in data:
    #         # 发消息告知云生物, 客户已经填好取样日期和地址, 正在等待取样
    #         print '需要发送消息给云生物, 告知取样日期'
    #         # 设置 label '取样等待中'
    #         label = '取样等待中'
    #         h.set_project_label(project, label)
    #         # 添加项目详情
    #         h.set_project_process_detail(project, label)
    #     return

    # def _send_message_to_shipment_enterprise(self, project, data):
    #     # 已有单独的接口 set_shipment_enterprise
    #     # 检查是否含取样时间
    #     t = 'take_sample_time'
    #     if t in data:
    #         # 发消息告知物流, 客户填写取样日期和地址以及云生物给定的取样时间
    #         print '需要发送消息给物流, 告知取样时间'
    #     return

    # def _admin_confirm_accept_sample(self, project, data):
    #     # 此功能可以单独做成一个接口
    #     # 检查是否为管理员确认收样
    #     t = 'accept_sample_complete'
    #     if t in data:
    #         t = project.accept_sample_complete
    #         if not t:
    #             # 发消息告知用户已经收样
    #             print '需要发送消息告知用户已经收样'
    #             # 设置 label '已收样'

    #     return
