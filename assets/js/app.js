var address = 'http://localhost/php-backbone-app/server/';

var App = {
    run: function(){ 
        this.addview = new this.addView();
        this.listview = new this.listView();
        this.searchview = new this.searchView();
        this.contactcollection = new this.contactCollection();
        this.router = new this.Router();
        Backbone.history.start();
        this.router.navigate('list',{trigger:true});

    }
};

 App.Router = Backbone.Router.extend({
    routes:{
            'add':  'renderAddnew',
            'list': 'renderList',
            'search': 'renderSearch',
            'edit/:id':'renderEdit',
            'view/:id':'renderView'

    },

    renderAddnew : function(){ 

        App.addview.addPage(); 
    },

    renderList : function(){  
        App.listview.setElement('div.abPanel');
        App.listview.listPage();
    },
    renderSearch : function(){  
        App.searchview.searchPage();
    },
    renderEdit : function( id ){  
        App.addview.addPage( id );
    },
    renderView : function( id ){  
        App.addview.addPage( id );
    }
 });

    
 App.ContactModel = Backbone.Model.extend({
    
    sync: function( method , model , options ){ 
        
        if( method === 'create' || method === 'update' )
        {
            return $.ajax({
                dataType : 'json',
                url: address + 'add.php',
                data:{
                    id: (this.get('id') || ''),
                    type: (this.get('type') || ''),
                    data: (this.get('data') || '')
                },
                success: function( data ){
                    $('span.false').html('');

                    if( data.success === true){

                         if( method === 'update')
                         {
                            App.router.navigate('list',{ trigger:true });
                         }
                         else 
                         {
                            $('form').get(0).reset();
                         }
                    }
                    else 
                    {
                        $.each( data.validationError, function(){ 
                            $('span.'+this.target).html(this.error);
                            
                        }); // end of each


                    }

                    $('span.success').html(data.msg).removeClass('false').addClass(data.success.toString());    
        
                }

            }); // end of ajax
        } // end of if
        else if ( method ==='delete' ){

            var id = this.get('id');

            return $.getJSON(address + 'delete.php',
                { id : id },
                function(data){ 

                    if( data.success === true ){
                        $('#contactTable tr[data-id="'+ id +'"]').hide('slow');
                    }
                    else
                    {
                        alert( data.msg );
                    }

                }); // end of getJSON

        }
    } // end of sync
 }); 

App.contactCollection = Backbone.Collection.extend({
    model : App.ContactModel,
    url: address + 'list.php'
});

App.addView = Backbone.View.extend({

    el: 'div.abPanel',

    template:  _.template($('#addContactTemplate').html()),
    
    events: {
        'submit form#addContactForm' : 'addContactEvent'
    },
    initialize : function(){ 
        _.bindAll(this,'addPage','addContactEvent');
    },
    addPage : function(id){ 
        var contact = {},

        // collection of model theke data ber kore anbo
        model = App.contactcollection.get(id);

        if( id !== undefined && model !== undefined ){
            contact = model.toJSON();
        }
        console.log(contact)
        this.$el.html(this.template({contact: contact}));

    },

    addContactEvent : function(event){
              

        var type = $('#inputType').val(),
            data = $('#inputData').val(),
            id = $('#id').val();

        if(id === '')
        {
            var contactmodel = new App.ContactModel({
                type : type,
                data:data
            });
        }
        else
        {
            var contactmodel = new App.ContactModel({
                id: id,
                type : type,
                data:data
            });
            

            
        }
                contactmodel.save();
                return false;

        
    }
});


// list view

 App.listView = Backbone.View.extend({
    el: 'div.abPanel',
    template: _.template($('#listContactTemplate').html()),
    
    initialize : function(){ 
        _.bindAll(this,'listPage','render');
    },
    render: function(response){ 
        var self = this;

        this.$el.html(this.template({contacts: response }));

        $('#contactTable tr[data-id]').each(function(){
            var id = $(this).attr('data-id');

            $(this).find('a.edit').click(function(){
                self.editContact(id);               
            });
            $(this).find('a.delete').click(function(){
                self.deleteContact(id);             
            });

        });//end of each
    },

    listPage: function(querystring){ 
        var self = this;

        App.contactcollection.fetch({
            data: querystring,
            success: function(collection , response){ 
                self.render(response);
            }
        });
    },

    deleteContact: function(id){ 
        if(confirm('are you sure?')){
            App.contactcollection.get(id).destroy();
        }
    },
    editContact: function(id){ 
    
            App.router.navigate('edit/'+id ,{ trigger : true });
        
    }

}); 

 App.searchView = Backbone.View.extend({
    el: 'div.abPanel',
    template: _.template($('#searchContactTemplate').html()),
    events: {
        'submit form#searchForm':'searchContacts'
    },
    initialize : function(){ 
        _.bindAll(this,'searchPage','searchContacts');
    },
    searchPage: function(){ 
        this.$el.html(this.template);

        App.listview.setElement('#gridd');
        App.listview.render({});
    },
    searchContacts: function(event){ 
    console.log(event);
        var full_name = $('#inName').val();

        App.listview.setElement('#gridd');
        App.listview.listPage({ full_name : full_name });
        return false;
    }
});

$(function(){
    
    App.run();
});
