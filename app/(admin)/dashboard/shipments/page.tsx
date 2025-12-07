import DeliveryForm from '@/app/_components/admin/DeliveryForm'
import DeliveriesTable from '@/app/_components/admin/DeliveriesTable'

export default function ShipmentsPage() {
    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-12 gap-6 lg:gap-8">
                {/* Page Header */}
                <div className="col-span-12">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
                                Deliveries
                            </h1>
                            <p className="text-[#90adcb] text-sm md:text-base font-normal leading-normal">
                                Create new deliveries and manage existing ones.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Left Panel: Create Delivery Form */}
                <div className="col-span-12 lg:col-span-5">
                    <DeliveryForm />
                </div>

                {/* Right Panel: Delivery List */}
                <div className="col-span-12 lg:col-span-7">
                    <DeliveriesTable />
                </div>
            </div>
        </main>
    )
}
