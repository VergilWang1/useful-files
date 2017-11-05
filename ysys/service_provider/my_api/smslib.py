#!/usr/bin/env python
#coding: utf-8

import sys,os
import urllib,urllib2
import base64
import hmac
import hashlib
from hashlib import sha1
import time
import uuid
import json

class alismslib:
    def __init__(self, access_key_id, access_key_secret, server_address='https://sms.aliyuncs.com'):
        self.access_key_id = access_key_id # 'LTAIUiR3KxPY60rY';
        self.access_key_secret = access_key_secret #'GrzW8UNuBWGTvhAf46QZpjnjG52rr2';
        self.server_address = server_address

    def percent_encode(self, encodeStr):
        encodeStr = str(encodeStr)
        res = urllib.quote(encodeStr.decode('utf8').encode('utf8'), '')
        res = res.replace('+', '%20')
        res = res.replace('*', '%2A')
        res = res.replace('%7E', '~')
        return res

    def compute_signature(self, parameters, access_key_secret):
        sortedParameters = sorted(parameters.items(), key=lambda parameters: parameters[0])
        canonicalizedQueryString = ''
        for (k,v) in sortedParameters:
            canonicalizedQueryString += '&' + self.percent_encode(k) + '=' + self.percent_encode(v)
        stringToSign = 'GET&%2F&' + self.percent_encode(canonicalizedQueryString[1:])
        print "stringToSign:  "+stringToSign
        h = hmac.new(access_key_secret + "&", stringToSign, sha1)
        signature = base64.encodestring(h.digest()).strip()
        return signature

    def compose_url(self,user_params):
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(time.time()))
        parameters = { \
                'Format'        : 'JSON', \
                'Version'       : '2016-09-27', \
                'AccessKeyId'   : self.access_key_id, \
                'SignatureVersion'  : '1.0', \
                'SignatureMethod'   : 'HMAC-SHA1', \
                'SignatureNonce'    : str(uuid.uuid1()), \
                'RegionId': 'cn-hangzhou',
                'Timestamp'     : timestamp\
        }
        for key in user_params.keys():
            parameters[key] = user_params[key]
        signature = self.compute_signature(parameters, self.access_key_secret)
        parameters['Signature'] = signature
        url = self.server_address + "/?" + urllib.urlencode(parameters)
        return url

    def make_request(self, user_params, quiet=False):
        url = self.compose_url(user_params)
        request = urllib2.Request(url)
        try:
            conn = urllib2.urlopen(request)
            response = conn.read()
        except urllib2.HTTPError, e:
            print(e.read().strip())
            raise SystemExit(e)
        try:
            obj = json.loads(response)
            if quiet:
                return obj
        except ValueError, e:
            raise SystemExit(e)
        json.dump(obj, sys.stdout, sort_keys=True, indent=2)
        sys.stdout.write('\n')
    
    def sendsms(self,signname,template,phonenumber,msg):
        #定义参数
        user_params = {'Action': 'SingleSendSms', 'ParamString': msg, 'RecNum': phonenumber,'SignName': signname,'TemplateCode': template }
        self.make_request(user_params)
    
#test
#    a = alismslib('LTAIUiR3KxPY60rY','GrzW8UNuBWGTvhAf46QZpjnjG52rr2')
#    a.sendsms('茹翔信息','SMS_47860087','18616336634','{"code":"test"}')