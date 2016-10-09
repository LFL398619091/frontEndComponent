-- 创建用户并为其赋权
insert into mysql.user(Host,User,Password)
values('%','cas_read',password('cas_read_123'));
insert into mysql.user(Host,User,Password)
values('%','cas_write',password('cas_write_123'));

--授权cas_write用户拥有cas数据库的所有权限。
grant all privileges on cas.* to cas_write@'%' identified
by 'cas_write_123';
--授权cas_read读的权限
grant select on cas.* to cas_read@'%' identified by 'cas_read_123';
flush privileges; --刷新系统权限表

1	liufulin	b3a4a350906115e829563ba4dbb0cf87	åˆ˜ç¦æž—	15313118386	0	2016-08-05 20:25:38
	zhangsansan	d1606f337f43f90596fe96324e6f5385	张三三	15698763489	0	2016-08-06 21:00:47
