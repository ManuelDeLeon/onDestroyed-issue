if (Meteor.isClient) {

  Template.registerHelper('addOnDestroyed', function () {
    var templateInstance = Template.instance();
    var template = templateInstance.view.template;
    if (!template.onDestroyedSet) {
      template.onDestroyedSet = true;
      template.onDestroyed(function () {
        console.log("onDestroyed from helper: " + Template.instance().data.name);
      })
    }
  });

  Children = new Mongo.Collection(null);
  Children.insert({name: "A"});
  Children.insert({name: "B"});

  Template.body.helpers({
    children: function () {
      return Children.find();
    }
  });

  Template.body.events({
    'click button': function () {
      var firstId = Children.findOne()._id;
      var firstName = Children.findOne().name;
      Children.remove(firstId);
      console.log("Removed: " + firstName);
    }
  });

  Template.child.onDestroyed(function () {
    console.log("onDestroyed regular: " + Template.instance().data.name);
  });

}