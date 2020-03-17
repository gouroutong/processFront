from fabric.api import *

env.hosts = ['47.107.230.235']
env.user = 'root'


# from fabric import task
@task
def tar_task():
  # 打包
  local("yarn build")
  local("tar -czvf dist.tar.gz dist")
  local('scp dist.tar.gz root@47.107.230.235:/usr/share/nginx')


@task
def put_task():
  with cd("/usr/share/nginx"):
    run('tar -xzvf dist.tar.gz')
    run('rm -rf dist.tar.gz')
    run('rm -rf html')
    run('mv dist html')
    run("systemctl restart nginx")
    run("echo success")

@task
def deploy():
  tar_task()
  put_task()
