#!/usr/bin/env python
# -*- coding: utf-8 -*-


class ThreeParamsConfig(object):
    def __init__(self, id_1, id_2, unhandled_request):
        self.id_1 = id_1
        self.id_2 = id_2
        self.datas = unhandled_request

        # 载入 module
        # 把生成 datas 的函数载入 config

        # module 配置
        t = {
        }
        self.config = t

    def _get_module_result(self, module):
        id_1 = self.id_1
        id_2 = self.id_2
        datas = self.datas

        m = module(id_1, id_2, datas)
        r = m.get_main
        return r
