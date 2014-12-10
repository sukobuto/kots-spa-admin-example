(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['knockout', 'jquery', 'bootstrap', 'knockout.validation'], factory);
	} else {
		// Browser globals
		factory(ko, jQuery);
	}
}(function(ko, $) {
	
	ko.bindingHandlers.dump = {
		update: function(element, valueAccessor, allBindings) {
			var value = ko.unwrap(valueAccessor()),
				dumpTo = ko.unwrap(allBindings.get('dumpTo')) || 'console',
				$elm = $(element);
			switch (dumpTo) {
				case 'console':
					console.log(value);
					break;
				case 'dom':
					$elm.html('<pre>' + JSON.stringify(value, null, 4) + '</pre>');
					break;
			}
		}
	};
	
	ko.bindingHandlers.modalShown = {
		init: function(element, valueAccessor) {
			var $elm = $(element), value = valueAccessor();
			if (ko.isWriteableObservable(value)) {
				$elm.on('hidden.bs.modal', function(e) {
					value(false)
				});
			}
			$elm.on('shown.bs.modal', function(e) {
				$elm.find("[autofocus]:first").focus();
			});
		},
		update: function(element, valueAccessor) {
			var value = valueAccessor();
			$(element).modal(!ko.unwrap(value) ? 'hide' : 'show');
		}
	};
	
}));
