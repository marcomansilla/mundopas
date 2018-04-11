# coding=utf-8

def api():
    from apimaker import APIMaker
    api = APIMaker(db)

    api.add_policy('socios','GET')
    api.add_policy('socios','POST')
    api.add_policy('socios','PUT')
    api.add_policy('socios','DELETE')

    api.add_policy('presentacion','GET')
    api.add_policy('presentacion','POST')
    api.add_policy('presentacion','PUT')
    api.add_policy('presentacion','DELETE')

    return api.process()
