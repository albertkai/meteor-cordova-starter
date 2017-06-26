import { PNotify } from 'meteor/kidovate:pnotify';
// import 'pnotify/src/pnotify';
// import 'pnotify/src/pnotify.buttons';
// import 'pnotify/src/pnotify.history';
// import 'pnotify/src/pnotify.confirm';

export const Notify = {
	alert({ title, text, type, delay }) {
		console.log('Notify');
		new PNotify({
			title: title,
			text: text,
			delay: delay || 3000,
      addclass: type,
		});
	},
	
	confirm({ title, text, yes, no }) {
		(new PNotify({
			title,
			text,
			hide: false,
			icon: false,
			confirm: {
				confirm: true,
				buttons: [{
					text: 'Да', click: function (notice, value) {
						notice.remove();
						notice.get().trigger("pnotify.confirm", [notice, value]);
					}
				}, {
					text: 'Нет', click: function (notice) {
						notice.remove();
						notice.get().trigger("pnotify.cancel", notice);
					}
				}]
			},
			buttons: {
				closer: false,
				sticker: false
			},
			history: {
				history: false
			}
		})).get().on('pnotify.confirm', function() {
			yes();
		}).on('pnotify.cancel', function() {
			no();
		});
	}
};
