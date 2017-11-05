#!/urs/bin/env python
# -*- coding: utf-8 -*-

import redis


class UseRedis(object):
    def __init__(self):
        pass

    def _get_redis(self):
        pool = redis.ConnectionPool(host='localhost', port=6379, db=0)
        r = redis.Redis(connection_pool=pool)
        return r

    def push_queue_value(self, queue_name, value):
        r = self._get_redis()
        k = queue_name
        r.lpush(k, value)
        return

    def get_queue_value(self, queue_name):
        r = self._get_redis()
        k = queue_name

        # 5 表示, 5秒内获取不到值, 则退出
        # [1] 表示, 获取到 r.blpop() 返回值 (k, v) 中的 v
        v = r.blpop(k, 5)[1]
        return v

    def set_value(self, key, value, timeout=None):
        r = self._get_redis()
        k = key
        v = value
        t = timeout
        r.set(k, v, t)

    def get_value(self, key):
        r = self._get_redis()
        v = r.get(key)
        return v
