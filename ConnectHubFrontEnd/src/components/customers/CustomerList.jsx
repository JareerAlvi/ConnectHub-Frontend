import "./CustomerList.css";

export default function CustomerList({
    customers,
       onCall,
    onChat
}) {

    return (

        <div className="customer-card">

            <h2>Customers</h2>

            {

                customers.length === 0 ?

                    <p>No customers found.</p>

                    :

                    customers.map(customer => (

                        <div
                            key={customer.customerId}
                            className="customer-row"
                        >

                            <div>

                                <strong>

                                    {customer.fullName}

                                </strong>

                                <p>{customer.companyName}</p>

                                <small>

                                    {customer.phoneNumber}

                                </small>

                            </div>

                            <button
                                onClick={() => onCall(customer)}
                            >
                                📞 Call
                            </button>
<button
    onClick={() => onChat(customer)}
>
    💬 Chat
</button>
                        </div>

                    ))

            }

        </div>

    );

}