#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import yaml

from datetime import datetime
from .....models import *

from .....my_api.handle_obj import HandleObj
from .....my_api.handle_file import HandleFile


class ReportConfirm(object):
    def __init__(self, id_1, unhandled_request):
        self.id_1 = id_1
        self.unhandled_request = unhandled_request

        # 载入 utils
        self.HandleObj = HandleObj
        self.HandleFile = HandleFile

        # 载入 report models
        self.ProjectModel = ProjectModel
        self.ReportModel = ReportModel

    def get_main(self):
        project_id = self.id_1

        t = self.unhandled_request
        source_datas = t.POST
        files = t.FILES
        user = t.user

        project_class = self.ProjectModel

        handle_obj = self.HandleObj()

        main = self._main

        # 初始化 response
        success = ''
        fail = ''
        message = ''
        data = ''

        # 取出数据
        k = 'save'
        save = handle_obj.loads_json_datas(k, source_datas)

        project = project_class.objects.get(id=project_id)
        report = project.report.all().order_by('id').last()

        try:
            main(user, files, save, report)
            success = True
            message = '操作成功'
        except:
            fail = True
            message = '操作失败'

        # 保存 detail, 或者添加信息

        r = {
            'success': success,
            'fail': fail,
            'message': message,
            'data': data,
        }
        return r

    def _save_files_return_addrs(self, datetime_now, file_dir):
        handle_file = self.HandleFile()

        t = self.unhandled_request
        source_files = t.FILES
        files = source_files.values()
        addrs = []
        for file in files:
            # 提取文件后缀
            file_name, file_suffix = file.name.split('.')

            # 构造文件名
            date_str = datetime_now.strftime("%Y%m%d")
            new_name = file_name + '-' + date_str

            # 文件地址且包含文件名和后缀
            base_addr = 'service_provider/upload'
            file_addr = handle_file.create_file_addr(base_addr,
                                                     file_dir,
                                                     new_name,
                                                     file_suffix)

            # 判断文件名是否重复. 如果重复, 则附加 '-数字'
            file_addr = handle_file.check_exists(file_addr)

            # 保存文件
            handle_file.save_file(file, file_addr)

            addrs.append(file_addr)
        return addrs

    def _instead_report(self, report, remark):
        # 有报告上传, 替换报告
        save_files_return_addrs = self._save_files_return_addrs
        handle_file = self.HandleFile()
        handle_obj = self.HandleObj()

        file_dir = 'reports'
        datetime_now = datetime.now()
        yunbio_confirm = True
        addrs = save_files_return_addrs(datetime_now, file_dir)
        for file_addr in addrs:
            new_name = handle_file.get_file_name(file_addr)

            # 保存报告信息
            obj = {
                'name': new_name,
                'addr': file_addr,
                'date': datetime_now,
                'remark': remark,
                'yunbio_confirm': yunbio_confirm,
            }
            r = report
            handle_obj.save_new_instance(r, obj)
        return

    def _yunbio_confirm_report(self, report, remark):
        # 无报告上传, 直接确认
        report.yunbio_confirm = True
        report.remark = remark
        report.save()
        return

    def _customer_confirm(self, report):
        project_id = self.id_1
        project_obj = self.ProjectModel
        # 用户进行确认操作
        report.customer_confirm = True
        report.save()

        # 并且将当前 step 设置为 complete == True
        project = project_obj.objects.get(id=project_id)
        step = (project.new_process
                       .process_step
                       .filter(active=True, running=True, complete=False)
                       .order_by('id')
                       .last())
        now = datetime.now()
        step.complete = True
        step.end_date = now.date()
        step.end_time = now.time()
        step.save()
        return

    def _main(self, user, files, datas, report):
        h = self.HandleObj()
        #
        instead_report = self._instead_report
        yunbio_confirm_report = self._yunbio_confirm_report
        customer_confirm = self._customer_confirm

        # 检查 report 是否为 None
        if report is None:
            raise "report is None!!!"

        # 查看用户身份
        print 'user:', user
        group_name = h.get_group_name(user)
        is_superuser = group_name == u'管理员'
        print 'superuser:', is_superuser

        # 判断是用户还是管理员
        if is_superuser:
            # 拿出评论
            k = 'remark'
            remark = ''
            t = datas[0]
            if k in t:
                remark = t[k]
            # 保存信息
            t = len(files) != 0
            if t:
                instead_report(report, remark)
            else:
                yunbio_confirm_report(report, remark)
        else:
            customer_confirm(report)
        return
