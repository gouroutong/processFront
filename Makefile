.PHONY: build
build:
	yarn build
.PHONY: docker
docker:
	docker build . -t registry.cn-shanghai.aliyuncs.com/chenwentao/xprocess-front:0.1.0
