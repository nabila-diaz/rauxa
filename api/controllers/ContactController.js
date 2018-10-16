/**
 * ContactController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	getAllContacts: async function (req, res) {
		try {
			const sql = `SELECT fullName, email, phone FROM user`,
					rawContacts = await sails.sendNativeQuery(sql);
					console.log(rawContacts);
					return res.send(rawContacts.rows);
		} catch (err) {
			console.error(err);
			throw err;
		}
	},

	addContact: async function (req, res) {
		const { fullName, email, phone } = req.body;

		const existingContact = await Contact.findOne({ email: email });

		if (existingContact){
			return res.json(`That contact is already on your list!`);
		} else {
			try {
				const addedContact = await Contact.create({
					fullName: fullName,
					email: email,
					phone: phone
				}).fetch();
				//TODO Add call to upload s3 pic
				return res.json(addedContact);
			} catch (error) {
				console.error(error);
				throw error;
			}
		}
	},

	getContact: async function (req, res) {
		console.log(`Looking good pal!`);
		const fullName = '', email = '', phone = '';

		const existingContact = await Contact.findOne({ id: req.param('id') });

		if (existingContact){
			return res.view('pages/contact', {
				contact: existingContact
			});
		} else {
			return res.json(`That contact is not on your list!`);
		}
	}

};

