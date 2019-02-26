class Base():
    DEBUG = False
    TESTING = False
    BUCKET = "kr-dr-temp-hip"
    PROJECT = "kr-dr-temp-hip"

class DevelopmentConfig(Base):
    DEBUG = True
    DEVELOPMENT = True
    BUCKET = "kr-dr-temp-hip"
    PROJECT = "kr-dr-temp-hip"
    API = "http://localhost:8081"

class AppEngineConfig(Base):
    DEBUG = False
    TESTING = False
    BUCKET = "kr-dr-temp-hip"
    PROJECT = "kr-dr-temp-hip"
    API = "https://backend-dot-kr-dr-temp-hip.appspot.com/"

class KubernetesConfig(Base):
    DEBUG = False
    TESTING = False
    BUCKET = "kr-dr-temp-hip"
    PROJECT = "kr-dr-temp-hip"
    API = "http://hip-local-api-svc:8081"
