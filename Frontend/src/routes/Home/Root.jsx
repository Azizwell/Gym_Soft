import fon from "D:/Shift/Backend/Project/Gym_Soft/Frontend/src/assets/fon.png";
import { useEffect, useRef, useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Register from "./Register";
import Login from "./Login";

export default function Root() {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState("");

  useEffect(() => {
    if (!visible) {
      setAction("");
    }
  }, [visible]);

  return (
    <>
      <div className="h-screen w-screen bg-gray-900 overflow-hidden">
        <header className="bg-red-900 text-white py-4">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">GYM SOFT</h1>
            <div>
              <button
                onClick={() => {
                  setAction("register");
                  setVisible(true);
                }}
                className="bg-red-700 px-4 py-2 rounded mr-4 hover:bg-red-600 transition"
              >
                Registration
              </button>
              <button
                onClick={() => {
                  setAction("login");
                  setVisible(true);
                }}
                className="bg-black px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Log In
              </button>
            </div>
          </div>
        </header>

        <main className="h-full w-full">
          <img
            src={fon}
            alt="Gym Background"
            className="h-full w-full object-cover"
          />
        </main>
        <Rodal
          height={action == "register" ? 400 : 300}
          visible={visible}
          onClose={() => setVisible(!visible)}
        >
          <div>
            {action === "register" ? (
              <Register setVisible={setVisible} />
            ) : action === "login" ? (
              <Login setVisible={setVisible} />
            ) : (
              ""
            )}
          </div>
        </Rodal>
      </div>
    </>
  );
}
