require(
	['dojo/request', 'dijit/registry', 'dojo/ready', 'dojo/dom-class'],
	function (request, registry, ready, domClass) {

		//Global Variables
		var grid = null;
		var store = null;
		var counter = 1;
		var alertManager = null;

		//ready function
		ready(function () {

			//grab dom elements
			grid = registry.byId("earthquakes");
			store = registry.byId("earthquakeStore");
			alertManager = registry.byId('alertManager');

			//collect data and set interval to gather new data
			getEarthquakeData();
			setInterval(getEarthquakeData, 30000);

			// Get an instance of the button on the page
			let button = registry.byId("checkedButton");
			let force = registry.byId("forceButton");

			// When the "Send" button is clicked, this function will send an SMS
			// message to the number given with the message informing them of the
			// earthquake and then indicate that a message was sent.
			button
				.on(
					'click',
					function () {
						var btn = this;
						let checkedArray = grid.getChecked();
						let targetCellNumber = registry
							.byId("phoneNumber");
						let number = targetCellNumber.value;
						request(
								'<c:url value="/earthquakes/sendSMS" />', {
									method: 'POST',
									handleAs: "json",
									data: {
										'toPhone': number,

										'body': checkedArray[i].title
									}
								})
							.then(
								function (data) {
									let pData = JSON
										.parse(data);
									grid.store
										.setData(pData);
									grid.refresh();
									if (pData.length > counter) {
										alertManager
											.addSuccess({
												message: 'Earthquake Added to Table!',
												title: "Success Title",
												hide: false,
												id: 'succ',
												position: 'earthquakeMessage'
											});
										counter = pData.length;
									}
								},
								function (err) {
									console
										.log("Error: " +
											err);
								});
						for (var i = 0; i < checkedArray.length; i++) {
							request(
								'<c:url value="/earthquakes/sendSMS" />', {
									method: 'POST',
									handleAs: "json",
									data: {
										'toPhone': number,

										'body': checkedArray[i].title
									}
								});

							alertManager
								.clear(alertManager.types.success);
							alertManager
								.addSuccess({
									message: 'Earthquake Message Sent Successfully!',
									title: "Success Title",
									hide: false,
									id: 'succ',
									position: 'earthquakeMessage'

								});

						};
						btn.stopSpinner();

					});

			// Forces a new Earthquake onto the Table
			force
				.on(
					'click',
					function () {
						var btn = this;
						domClass.add("table-container4",
							"hidden");
						domClass.remove("image", "hidden");
						request(
								'<c:url value="/earthquakes/force" />')
							.then(
								function (data) {
									let pData = JSON
										.parse(data);
									grid.store
										.setData(pData);
									grid.refresh();
									if (pData.length > counter) {
										alertManager
											.addSuccess({
												message: 'Earthquake Added to Table!',
												title: "Success Title",
												hide: false,
												id: 'succ',
												position: 'earthquakeMessage'
											});
										counter = pData.length;
									}
								},
								function (err) {
									console
										.log("Error: " +
											err);
								});
						grid.refresh();
						domClass.add("image", "hidden");
						domClass.remove("table-container4",
							"hidden");
						btn.stopSpinner();
						domClass.add("force", "hidden");
					});
		});

		// This function is what goes out and pings the Controller and gets the information
		// from the database
		getEarthquakeData = function () {
			domClass.add("table-container4", "hidden");
			domClass.remove("image", "hidden");
			request('<c:url value="/earthquakes/getEarthquakes" />')
				.then(function (data) {
					let pData = JSON.parse(data);
					grid.store.setData(pData);
					grid.refresh();
					if (pData.length > counter) {
						alertManager.addSuccess({
							message: 'Earthquake Added to Table!',
							title: "Success Title",
							hide: false,
							id: 'succ',
							position: 'earthquakeMessage'
						});
						counter = pData.length;
					}
				}, function (err) {
					console.log("Error: " + err);
				});
			grid.refresh();
			domClass.add("image", "hidden");
			domClass.remove("table-container4", "hidden");
		};
	});