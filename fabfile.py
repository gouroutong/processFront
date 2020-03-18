from fabric.api import *

env.hosts = ['47.107.230.235']
env.user = 'root'


# from fabric import task
@task
def tar_task():
  # 打包
  local("yarn build")


@task
def put_task():
  with settings(warn_only=True):
    put("dist/*", "/usr/share/nginx/html/")
  with cd("/usr/share/nginx"):
    run("systemctl restart nginx")
    run("echo success")

@task
def deploy():
  tar_task()
  put_task()
