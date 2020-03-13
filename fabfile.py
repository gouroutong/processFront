from fabric import *


# from fabric import task
@task
def tar_task(c):
  # 打包
  with c.cd("bin"):
    c.run('tar -czvf process-server.tar.gz process-server')
    c.run('scp process-server.tar.gz root@47.107.230.235:program/process')


@task
def put_task(c):
  # 创建远程服务器文件夹
  with Connection('root@47.107.230.235') as c:
    # 上传文件
    with c.cd("program/process"):
      c.run('tar -xzvf process-server.tar.gz')
      c.run("rm -rf process-server.tar.gz")
    with c.cd("/root"):
      c.run('supervisorctl update')
      c.run('supervisorctl -c supervisord.conf reload')
      c.run("echo success")


@task
def deploy(c):
  tar_task(c)
  put_task(c)
