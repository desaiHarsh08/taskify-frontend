import Alert from "@/components/ui/Alert";
import { CalendarDays } from "lucide-react";

export default function Home() {
  return (
    <div className="container-fluid m-0 p-1 w-100 h-100">
      <div className="row m-0 p-0 w-100 h-100">
        <div className="col-md-9 h-100">
          <div className="row h-100">
            <div className="col-12 d-flex align-items-center w-100">
              <img
                src="/welcome-user-image.png"
                alt="welcome-user-image.png"
                height={150}
              />
              <Alert
                alertTitle="Welcome!"
                variant="success"
                alertNote="Your all caugth up!"
              >
                Harsh Nilesh Desai
              </Alert>
            </div>
            <div className="col-12 h-100 border-top py-3">
              <div className="row m-0 h-100 p-0">
                <div className="col-md-4 p-2 pt-4 d-flex flex-column gap-2">
                  <div className="border-bottom pb-2 d-flex flex-column gap-2">
                    <CalendarDays />
                    <h3>Thursday 01, August, 2024</h3>
                  </div>
                </div>
                <div className="col-md-8 p-0">Lorem, ipsum dolor.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 border">Lorem, ipsum dolor.</div>
      </div>
    </div>
  );
}
