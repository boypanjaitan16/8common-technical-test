import EmailMessageCard from "../components/EmailMessageCard";

export default function Challenge1Page(){
    return (
		<>
		<h1 className='my-5 text-xl font-bold text-center'>Email Message Card</h1>
		<section className='bg-gray-200 min-w-full p-5 space-y-5'>
			<EmailMessageCard
				message={{
					id: "1234",
					dateTimeCreated: 1560120300000,
					from: { 
						//name: "Sianna Hallas", 
						email: "shallas@gmail.com" 
					},
					to: [
						{ 
							// name: "Support", 
							email: "support@company.com" 
						},
						{ name: "FirstName LastName", email: "name@gmail.com" },
					],
					cc: [],
					contentPreview:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in",
					content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p>Thanks,<br />Sianna</p>",
				}}
				defaultExpanded
				onReply={(message) => console.log("onReply", message)}
				onReplyAll={(message) => console.log("onReplyAll", message)}
				onForward={(message) => console.log("onForward", message)}
				onDiscard={(message) => console.log("onDiscard", message)}
				onEscalate={(message) => console.log("onEscalate", message)}
			/>

			<EmailMessageCard
				message={{
					id: "1234",
					dateTimeCreated: 1560120300000,
					from: { name: "Support", email: "support@company.com" },
					to: [
						{ name: "Sianna Hallas", email: "shallas@gmail.com" }
					],
					cc: [
						{ name: "Dennis Panjaitan", email: "dennis.jait@gmail.com" },
						{ email: "nahitu.hasiholan@gmail.com" }
					],
					contentPreview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in",
					content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>",
				}}
				defaultExpanded={false}
				onReply={(message) => console.log("onReply", message)}
				onReplyAll={(message) => console.log("onReplyAll", message)}
				onForward={(message) => console.log("onForward", message)}
				onDiscard={(message) => console.log("onDiscard", message)}
				onEscalate={(message) => console.log("onEscalate", message)}
			/>
		</section>
		</>
	);
}