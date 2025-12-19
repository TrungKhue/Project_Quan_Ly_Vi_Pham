import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const btnScan = document.getElementById("btnScanQR");
const qrReader = document.getElementById("qr-reader");

let qr;

btnScan.onclick = () => {
    qrReader.style.display = "block";
    qr = new Html5Qrcode("qr-reader");

    qr.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (studentId) => {
            await loadStudent(studentId);
            await qr.stop();
            qrReader.style.display = "none";
        }
    );
};

async function loadStudent(studentId) {
    try {
        const studentSnap = await getDoc(doc(db, "students", studentId));
        if (!studentSnap.exists()) {
            alert("Không tìm thấy học sinh");
            return;
        }

        const student = studentSnap.data();
        document.getElementById("studentName").value = student.full_name;
        document.getElementById("studentClass").value = student.class;

        if (student.bike_id) {
            const bikeSnap = await getDoc(doc(db, "bikes", student.bike_id));
            if (bikeSnap.exists()) {
                document.getElementById("bikeCode").value =
                    bikeSnap.data().license_plate;
            }
        }
    } catch (e) {
        console.error(e);
        alert("Lỗi khi quét QR");
    }
}
