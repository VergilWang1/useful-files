# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.contrib.auth.models import User

# Create your models here.


@python_2_unicode_compatible
class ProjectModel(models.Model):
    name = models.CharField('项目名称', max_length=100, blank=True, null=True)
    create_date = models.DateTimeField('创建时间', auto_now_add=False, blank=True, null=True)
    identifier = models.CharField('编号', max_length=100, blank=True, null=True)
    content = models.CharField('内容', max_length=200, blank=True, null=True)
    test_index = models.CharField('检测指标', max_length=100, blank=True, null=True)
    species = models.CharField('物种', max_length=100, blank=True, null=True)
    sample_size = models.CharField('样本数量', max_length=100, blank=True, null=True)
    homogenization = models.BooleanField('样品均质化说明', default=False)
    sampling_address = models.CharField('取样地址', max_length=100, blank=True, null=True)
    take_sample_date = models.DateField('取样的日期', blank=True, null=True)
    take_sample_time = models.TimeField('取样的时间', blank=True, null=True)
    take_sample_time_confirm = models.BooleanField('取样时间确认', default=False)
    take_sample_complete = models.BooleanField('取样样完成', default=False)
    accept_sample_date = models.DateField('收样的日期', blank=True, null=True)
    accept_sample_time = models.TimeField('收样的时间', blank=True, null=True)
    accept_sample_complete = models.BooleanField('收样完成', default=False)
    customer_id = models.CharField('客户id', max_length=100, blank=True, null=True)
    service_provider_id = models.CharField('服务商id', max_length=100, blank=True, null=True)
    shipment_enterprise_id = models.CharField('物流id', max_length=100, blank=True, null=True)
    system_contact = models.ForeignKey('SystemContact', verbose_name='云生物', related_name='project', blank=True, null=True)
    complete = models.BooleanField('项目完成状态', default=False)
    new_process = models.ForeignKey('NewProcess', verbose_name='new流程', related_name='project', blank=True, null=True)
    label = models.CharField('项目标签', max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = u'项目'
        verbose_name_plural = verbose_name


@python_2_unicode_compatible
class SystemContact(models.Model):
    name = models.CharField('名称', max_length=100, blank=True, null=True)
    email = models.CharField('邮箱', max_length=100, blank=True, null=True)
    email_password = models.CharField('邮箱密码', max_length=100, blank=True, null=True)
    phone = models.CharField('手机', max_length=100, blank=True, null=True)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = u'系统联系方式'
        verbose_name_plural = verbose_name


@python_2_unicode_compatible
class NewProcess(models.Model):
    name = models.CharField('流程名称', max_length=100, blank=True, null=True)
    # process_step_model = models.ForeignKey('NewProcessStepModel', verbose_name='流程步骤模板', related_name='process', blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = u'流程'
        verbose_name_plural = verbose_name


@python_2_unicode_compatible
class NewProcessStep(models.Model):
    name = models.CharField('步骤名称', max_length=100, blank=True, null=True)
    start_date = models.DateField('开始日期', blank=True, null=True)
    start_time = models.TimeField('开始时间', blank=True, null=True)
    end_date = models.DateField('结束日期', blank=True, null=True)
    end_time = models.TimeField('结束时间', blank=True, null=True)
    cycle = models.IntegerField('周期', blank=True, null=True)
    remark = models.CharField('备注', max_length=1000, blank=True, null=True)
    process_model = models.ForeignKey(NewProcess, verbose_name='流程', related_name='process_step', blank=True, null=True)
    # 发送信息的内容
    send_message = models.BooleanField('发送短信', default=False)
    message_content = models.CharField('短信内容', max_length=1000, blank=True, null=True)
    send_email = models.BooleanField('发送邮件', default=False)
    email_content = models.CharField('邮件内容', max_length=10000, blank=True, null=True)
    # 以下为收件人
    yunbio = models.BooleanField('云生物', default=False)
    customer = models.BooleanField('客户', default=False)
    service_provider = models.BooleanField('服务商', default=False)
    shipment_enterprise = models.BooleanField('物流商', default=False)
    # 状态
    half_cycle_message_status = models.BooleanField('周期一半的消息状态', default=False)
    running = models.BooleanField('可运行', default=False)
    complete = models.BooleanField('步骤完成', default=False)
    active = models.BooleanField('可用', default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = u'流程步骤'
        verbose_name_plural = verbose_name


@python_2_unicode_compatible
class NewProcessModel(models.Model):
    name = models.CharField('流程名称', max_length=100, blank=True, null=True)
    # process_step_model = models.ForeignKey('NewProcessStepModel', verbose_name='流程步骤模板', related_name='process', blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = u'流程模板'
        verbose_name_plural = verbose_name


@python_2_unicode_compatible
class NewProcessStepModel(models.Model):
    name = models.CharField('步骤名称', max_length=100, blank=True, null=True)
    start_date = models.DateField('开始日期', blank=True, null=True)
    start_time = models.TimeField('开始时间', blank=True, null=True)
    end_date = models.DateField('结束日期', blank=True, null=True)
    end_time = models.TimeField('结束时间', blank=True, null=True)
    cycle = models.IntegerField('周期', blank=True, null=True)
    remark = models.CharField('备注', max_length=1000, blank=True, null=True)
    process_model = models.ForeignKey(NewProcessModel, verbose_name='流程模板', related_name='process_step', blank=True, null=True)
    # 发送信息的内容
    send_message = models.BooleanField('发送短信', default=False)
    message_content = models.CharField('短信内容', max_length=1000, blank=True, null=True)
    send_email = models.BooleanField('发送邮件', default=False)
    email_content = models.CharField('邮件内容', max_length=10000, blank=True, null=True)
    # 以下为收件人
    yunbio = models.BooleanField('云生物', default=False)
    customer = models.BooleanField('客户', default=False)
    service_provider = models.BooleanField('服务商', default=False)
    shipment_enterprise = models.BooleanField('物流商', default=False)
    # 状态
    half_cycle_message_status = models.BooleanField('周期一半的消息状态', default=False)
    running = models.BooleanField('可运行', default=False)
    complete = models.BooleanField('步骤完成', default=False)
    active = models.BooleanField('可用', default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = u'流程步骤模板'
        verbose_name_plural = verbose_name


@python_2_unicode_compatible
class EstimateModel(models.Model):
    logistics_star = models.CharField('物流星级', max_length=100, blank=True, null=True)
    service_star = models.CharField('服务商星级', max_length=100, blank=True, null=True)
    logistics_satisfactory = models.CharField('物流满意', max_length=100, blank=True, null=True)
    service_satisfactory = models.CharField('服务商满意', max_length=100, blank=True, null=True)
    logistics_comment = models.CharField('物流评价', max_length=100, blank=True, null=True)
    service_comment = models.CharField('服务商评价', max_length=100, blank=True, null=True)
    project = models.ForeignKey(ProjectModel, verbose_name='项目', related_name='estimate', blank=True, null=True)
    active = models.BooleanField('可用状态', default=True)

    def __str__(self):
        return self.logistics_comment

    class Meta:
        verbose_name = '评价'
        verbose_name_plural = verbose_name


@python_2_unicode_compatible
class SampleModel(models.Model):
    identifier = models.CharField('样本编号', max_length=100, blank=True, null=True)
    genre = models.CharField('样本类型', max_length=100, blank=True, null=True)
    storage_medium = models.CharField('保存介质', max_length=100, blank=True, null=True)
    number = models.CharField('数量', max_length=100, blank=True, null=True)
    grouping = models.CharField('分组', max_length=100, blank=True, null=True)
    remark = models.CharField('备注', max_length=100, blank=True, null=True)
    project = models.ForeignKey(ProjectModel, verbose_name='项目', related_name='sample', blank=True, null=True)
    active = models.BooleanField('可用状态', default=True)

    def __str__(self):
        return self.identifier

    class Meta:
        verbose_name = '样本'
        verbose_name_plural = verbose_name


@python_2_unicode_compatible
class ProjectProgressDetailModel(models.Model):
    content = models.CharField('内容', max_length=100, blank=True, null=True)
    date = models.DateTimeField('日期', auto_now_add=True)
    project = models.ForeignKey(ProjectModel, related_name='detail', verbose_name='项目', blank=True, null=True)
    active = models.BooleanField('可用状态', default=True)

    def __str__(self):
        return self.content

    class Meta:
        verbose_name = '项目进度详情'
        verbose_name_plural = verbose_name


@python_2_unicode_compatible
class ReportModel(models.Model):
    name = models.CharField('名称', max_length=100, blank=True, null=True)
    addr = models.CharField('地址', max_length=100, blank=True, null=True)
    date = models.DateTimeField('日期', max_length=100, blank=True, null=True)
    remark = models.CharField('备注', max_length=100, blank=True, null=True)
    project = models.ForeignKey(ProjectModel, related_name='report', verbose_name='项目', blank=True, null=True)
    yunbio_confirm = models.BooleanField('云生物确认', default=False)
    customer_confirm = models.BooleanField('客户确认', default=False)
    download = models.BooleanField('下载状态', default=False)
    active = models.BooleanField('可用状态', default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '报告'
        verbose_name_plural = verbose_name
