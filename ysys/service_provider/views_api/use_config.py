#!/usr/bin/env python
# -*- coding: utf-8 -*-


class UseConfig(object):
    def __init__(self):
        pass

    def get(self, config, behavior, *args):
        # args 目前, 包括 the_id, datas, 请按顺序传参
        c = config(*args)
        f = c.config[behavior]
        r = f()
        return r
