# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

# ----------------------------------------------------------------------------------------------------------------------
# Customize your APP title, subtitle and menus here
# ----------------------------------------------------------------------------------------------------------------------

response.logo = A(B('web', SPAN(2), 'py'), XML('&trade;&nbsp;'),
                  _class="navbar-brand", _href="http://www.web2py.com/",
                  _id="web2py-logo")
response.title = request.application.replace('_', ' ').title()
response.subtitle = ''

# ----------------------------------------------------------------------------------------------------------------------
# read more at http://dev.w3.org/html5/markup/meta.name.html
# ----------------------------------------------------------------------------------------------------------------------
response.meta.author = myconf.get('app.author')
response.meta.description = myconf.get('app.description')
response.meta.keywords = myconf.get('app.keywords')
response.meta.generator = myconf.get('app.generator')

# ----------------------------------------------------------------------------------------------------------------------
# your http://google.com/analytics id
# ----------------------------------------------------------------------------------------------------------------------
response.google_analytics_id = None

# ----------------------------------------------------------------------------------------------------------------------
# this is the main application menu add/remove items as required
# ----------------------------------------------------------------------------------------------------------------------

# creacion de opciones en forma automatica consultando a la db
productos=[]
servicios=[]

for row in db(db.productos.id>0).select(orderby=db.productos.nombre, cache=(cache.ram, 60)):
    productos.append(((T(row.nombre), False, URL('web','productos', args=row.nombre.lower().replace(" ","")), [])))

for row in db(db.servicios.id>0).select(orderby=db.servicios.nombre, cache=(cache.ram, 60)):
    servicios.append(((T(row.nombre), False, URL('web','servicios', args=row.nombre.lower().replace(" ", "")), [])))
    
response.menu = [
    (T('Inicio'), request.function=='index', URL('web','index'), []),
    (T('Productos'), request.function=='productos', '#', productos),
    (T('Servicios'), request.function=='servicios', '#', servicios),
    (T('Trabaje con nosotros'), request.function=='trabaja', URL('web','trabaja'), []),
    (A(SPAN('Solicitar cotizacion',_class='cotizador'), False, '#', [])),
    (A(I(_class='fa fa-envelope-o contacto'), False, '#', [])),
]

def _():
    # shortcuts
    app = request.application
    ctr = request.controller
    if auth.is_logged_in():
        response.menu+=[(T('Administrar'), False, URL('administrar', 'index'), [])]


_()

DEVELOPMENT_MENU = False


# ----------------------------------------------------------------------------------------------------------------------
# provide shortcuts for development. remove in production
# ----------------------------------------------------------------------------------------------------------------------

if "auth" in locals():
    auth.wikimenu()
