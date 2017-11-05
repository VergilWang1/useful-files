#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import yaml

from datetime import datetime, date

from service_provider.models import *


class HandleObj(object):
    def __init__(self):
        pass

    def _json_date_serialize(self, obj):
        # 此为 json.dumps() 中的 default 参数, 所提供函数
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        else:
            raise TypeError('%r is not JSON serializable' % obj)

    def _get_json_serialize(self, data):
        func = self._json_date_serialize
        r = json.dumps(data, default=func)
        return r

    def _get_obj_dict(self, obj):
        # 获取对象的 dict 形式, 且删除 以 '_' 字符开头的私有键-值对
        r = obj.__dict__
        for ii in r.keys():
            if ii[0] == '_':
                r.pop(ii)
        return r

    def get_objs_json_serialize(self, data, json_serialize=False):
        j = json_serialize

        # 获取 obj dict, 并删除以 '_'起头的内部 key
        objs = []
        for i in data:
            r = self._get_obj_dict(i)
            objs.append(r)

        # 判断是否 json 序列化
        if j:
            r = self._get_json_serialize(objs)
        else:
            r = objs
        return r

    def save_new_instance(self, instance, data):
        # 从 data 中获取键值, 且替换 instance 中的 属性/键 值
        p = instance
        keys = data.keys()
        for i in keys:
            setattr(p, i, data[i])
        p.save()

    def loads_json_datas(self, key, datas):
        # 取出 键值对 中的 json值
        k = key
        t = datas[k]
        r = yaml.safe_load(t)
        return r

    def get_group_name(self, user):
        group_name = ''
        t = user.groups.first()
        if t is not None:
            group_name = t.name
        return group_name

    def set_project_label(self, project, label):
        project.label = label
        project.save()
        return

    def set_project_process_detail(self, project, content):
        # 设置项目进度详细, 例: xxx 日, 进行了 xx 操作
        detail = ProjectProgressDetailModel()
        detail.project = project
        detail.content = content
        detail.save()
        return
