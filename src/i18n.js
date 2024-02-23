// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    th: {
      translation: {
        hello: "สวัสดี, โลก!",
        kasemrad_sriburin: "เกษมราษฎร์ ศรีบุรินทร์",
        hospital_you_trust: "โรงพยาบาลที่คุณวางใจ",
        changeLanguage: "เปลี่ยนภาษา",
        home: "หน้าหลัก",
        register: "สมัครสมาชิก",
        about: "เกี่ยวกับ",
        about_us: "เกี่ยวกับเรา",
        director: "ผู้บริหาร",
        message_from_the_director: "สาส์นจากประธานกรรมการ",
        message_from_hospital_director: "สาส์นจากผู้อำนวยการโรงพยาบาล",
        hospital_history: "ประวัติโรงพยาบาล",
        history: "ประวัติ",
        appointment_history: "ประวัตินัดหมาย",
        vision_and_mission: "วิสัยทัศน์และพันธกิจ",
        accreditation: "รางวัลแห่งความสำเร็จ",
        login: "เข้าสู่ระบบ",
        our_services: "บริการของเรา",
        view_all: "ดูทั้งหมด",
        room_services: "บริการห้องพัก/สิ่งอำนวยความสะดวก",
        packages: "แพ็คเกจ&โปรโมชั่น",
        recommended_package: "แพ็กเกจแนะนำ",
        view_all_packages: "ดูแพ็คเกจทั้งหมด",
        all_packages: "แพ็คเกจทั้งหมด",
        appointment_details: "รายละเอียดการนัด",
        view_details: "ดูรายละเอียด",
        more_details: "รายละเอียดเพิ่มเติม",
        price: "ราคา",
        expiration_date: "วันหมดอายุ",
        promotion_period: "ระยะเวลาโปรโมชั่น",
        time: "เวลา",
        date: "วันที่",
        health_articles: "บทความเพื่อสุขภาพ",
        kasemrad_article: "บทความเกษมราษฎร์",
        view_all_articles: "ดูบทความทั้งหมด",
        read_more: "อ่านเพิ่มเติม",
        news: "ข่าวสาร",
        doctor: "แพทย์",
        clinic: "คลินิก",
        status: "สถานะ",
        tool: "เครื่องมือ",
        medical_service_center: "ศูนย์บริการทางการแพทย์",
        search_for_a_doctor: "ค้นหาแพทย์",
        search_by_name_expertise_and_others: "ค้นหาด้วยชื่อ ความเชี่ยวชาญ และ อื่นๆ",
        doctor_details: "รายละเอียดแพทย์",
        doctor_expertise: "ความชำนาญ",
        doctor_list: "รายชื่อแพทย์",
        all_articles: "บทความทั้งหมด",
        contact: "ติดต่อ/สมัครงาน",
        personal_information: "ข้อมูลส่วนตัว",
        congenital_disease: "โรคประจำตัว/แพ้ยา",
        contact_us: "ติดต่อสอบถาม",
        ask_for_information_on_treatment_and_services: "สอบถามข้อมูล การรักษา และ บริการ",
        appointment: "นัดหมาย",
        cookies:
          'เมื่อคลิก “อนุญาตคุกกี้ทั้งหมด"\n' +
          "หมายความว่าผู้ใช้งานยอมรับที่จะเปิดการใช้งานคุกกี้เพื่อวัตถุประสงค์ต่าง ๆ ดังต่อไปนี้\n" +
          "เพื่อให้เว็บไซต์สามารถทำงานได้อย่างถูกต้องและเต็มประสิทธิภาพ\n" +
          "เพื่อเปิดใช้คุณสมบัติของโซเชียลมีเดีย\n" +
          "และเพื่อวิเคราะห์การเข้าใช้งานเพื่อนำข้อมูลไปใช้ในการทำการตลาดและการโฆษณา\n" +
          "รวมถึงการแบ่งปันข้อมูลการใช้งานกับพาร์ทเนอร์โซเชียลมีเดีย",
        allow_all_cookies: "อนุญาตคุกกี้ทั้งหมด",
        appointment_with_doctor: "นัดหมายแพทย์",
        book_an_appointment_online: "จองนัดหมายผ่านทางออน์ไลน์",
        national_identification_number: "เลขประจำตัวประชาชน",
        passport: "พาสปอร์ต",
        password: "รหัสผ่าน",
        forgot_password: "ลืมรหัสผ่าน",
        no_account: "ยังไม่มีบัญชี",
        terms_and_conditions_of_service: "ข้อกำหนดและเงื่อนไขการใช้บริการ นัดหมายออนไลน์",
        read_and_agreed_to_the_terms: "ข้าพเจ้าได้อ่าน และยอมรับข้อกำหนด และเงื่อนไขการใช้บริการ",
        unknown: "* ไม่ทราบให้กรอก - ",
        hospital_number: "เลขที่โรงพยาบาล",
        prefix: "คำนำหน้า",
        mr: "นาย",
        mrs: "นาง",
        miss: "นางสาว",
        name: "ชื่อ",
        last_name: "นามสกุล",
        birthday: "วันเกิด",
        house_numbe: "บ้านเลขที่",
        village_no: "หมู่",
        province: "จังหวัด",
        district: "อำเภอ / เขต",
        sub_district: "ตำบล / แขวง",
        postal_code: "รหัสไปรษณีย์",
        telephone_numbe: "เบอร์โทรศัพท์",
        email: "อีเมล",
        confirm_password: "ยืนยันรหัสผ่าน",
        passwords_dont_match: "รหัสผ่านไม่ตรงกัน",
        please_confirm_your_passwords_match: "กรุณายืนยันรหัสผ่านให้ตรงกัน",
        save: "บันทึก",
        male: "ชาย",
        female: "หญิง",
        incomplete_information: "ข้อมูลไม่ครบถ้วน",
        please_fill_in: "กรุณากรอก",
        completely: "ให้ครบถ้วน",
        ok: "ตกลง",
        close: "ปิด",
        invalid_email_format: "รูปแบบอีเมลไม่ถูกต้อง",
        please_enter_your_email_address_correctly: "กรุณากรอกอีเมลให้ถูกต้อง",
        found_duplicate_information: "พบข้อมูลซ้ำ",
        this_information_is_already_in_use: "ข้อมูลนี้ถูกใช้งานแล้ว",
        successfully_registered: "ลงทะเบียนสำเร็จ",
        unable_to_login: "ไม่สามารถเข้าสู่ระบบ",
        please_contact_medical: "กรุณาทำการยืนยันตัวตนผ่าน OTP",
        login_successful: "เข้าสู่ระบบสำเร็จ",
        logout: "ออกจากระบบ",
        welcome_to: "ยินดีต้อนรับเข้าสู่ นัดหมายออนไลน์",
        login_failed: "เข้าสู่ระบบไม่สำเร็จ",
        update_successful: "การอัปเดตสำเร็จ",
        error_updating_information: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล",
        password_reset_successful: "รีเซ็ตรหัสผ่านสำเร็จ",
        reset_password: "รีเซ็ตรหัสผ่าน",
        reset_your_password_with_your_registered_mobileNo:
          "รีเซ็ตรหัสผ่านด้วยเบอร์โทรศัพท์ที่ลงทะเบียนไว้",
        notifications: "การแจ้งเตือน",
        make_an_appointment_with: "นัดหมายกับ",
        confirmed: "ถูกยืนยัน",
        waiting_for_confirmation: "รอยืนยัน",
        confirm_appointment: "ยืนยันนัดหมาย",
        cancel_appointment: "ยกเลิกนัดหมาย",
        reset: "รีเซ็ท",
        completed: "เสร็จสมบูรณ์",
        unknown_status: "ไม่ทราบ",
        latest_appointment_list: "รายการนัดหมายล่าสุด",
        no_appointment_made: "ยังไม่มีรายการนัดหมาย",
        setting: "ตั้งค่า",
        please_note: "โปรดทราบ",
        appointment_date: "วันที่นัด",
        initial_symptoms: "อาการเบื้องต้น",
        no_information_found: "ไม่พบข้อมูล",
        after_registering: "หลังจากลงทะเบียนนัดเสร็จแล้วจะมีเจ้าหน้าที่ติดต่อกลับ",
        this_registration_will_record: "การลงทะเบียนนี้จะมีการบันทึกข้อมูลส่วนตัว ",
        and_information_in_your:
          " และข้อมูลในการลงทะเบียนของท่าน เพื่อบันทึกเป็นประวัติไว้กับทางโรงพยาบาลฯ โปรดระบุตามความเป็นจริง",
        address: "ที่อยู่",
        identificationType: "ประเภทบัตรประจำตัว",
        identificationNumber: "เลขบัตรประชาชน/พาสปอร์ต",
        hospitalNumber: "HN",
        gender: "คำนำหน้า/เพศ",
        firstName: "ชื่อ",
        lastName: "นามสกุล",
        birthDate: "วันเกิด",
        Address: "บ้านเลขที่",
        villageNumber: "หมู่",
        mobileNo: "เบอร์โทรศัพท์",
      },
    },
    en: {
      translation: {
        hello: "Hello, World!",
        kasemrad_sriburin: "Kasemrad Sriburin",
        hospital_you_trust: "Hospital You Can Trust.",
        changeLanguage: "Change Language",
        home: "Home",
        register: "Register",
        about: "About",
        about_us: "About Us",
        director: "Director",
        message_from_the_director: "Message from the director",
        message_from_hospital_director: "Message from hospital director",
        hospital_history: "Hospital history",
        history: "History",
        appointment_history: "Appointment history",
        vision_and_mission: "Vision and mission",
        accreditation: "Accreditation",
        login: "Login",
        our_services: "Our services",
        view_all: "View all",
        room_services: "Room services",
        packages: "Packages and promotions",
        recommended_package: "Recommended package",
        view_all_packages: "View all packages",
        all_packages: "All packages",
        appointment_details: "Appointment details",
        view_details: "View details",
        more_details: "More details",
        price: "price",
        expiration_date: "Expiration date",
        promotion_period: "Promotion period",
        time: "Time",
        date: "Date",
        health_articles: "Health articles",
        kasemrad_article: "Kasemrad article",
        view_all_articles: "View all articles",
        read_more: "Read more",
        news: "News",
        doctor: "Doctor",
        clinic: "Clinic",
        status: "Status",
        tool: "Tool",
        medical_service_center: "Medical Service Center",
        search_for_a_doctor: "Search for a doctor",
        search_by_name_expertise_and_others: "Search by name Expertise and others",
        doctor_details: "Doctor details",
        doctor_expertise: "Expertise",
        doctor_list: "Doctor list",
        personal_information: "Personal information",
        congenital_disease: "Congenital disease/drug allergy",
        contact: "Contact",
        contact_us: "Contact us",
        ask_for_information_on_treatment_and_services: "Enquiries, treatment and services",
        appointment: "Appointment",
        cookies:
          "When clicking “Allow all cookies”\n" +
          "This means that the user agrees to enable the use of cookies for the following purposes.\n" +
          "So that the website can function correctly and at full capacity.\n" +
          "To enable social media features\n" +
          "and to analyze traffic in order to use the information for marketing and advertising.\n" +
          "Including sharing usage data with social media partners.",
        allow_all_cookies: "Allow all cookies",
        appointment_with_doctor: "Booking Appointments",
        book_an_appointment_online: "Book an appointment online",
        national_identification_number: "Identification number",
        passport: "Passport",
        password: "Password",
        forgot_password: "Forgot your password?",
        no_account: "No account",
        terms_and_conditions_of_service: "Terms and conditions of online booking service",
        read_and_agreed_to_the_terms:
          "I have read and agreed to the terms and conditions of service.",
        unknown: "* If you don't know, fill in - ",
        hospital_number: "Hospital number",
        prefix: "Prefix",
        mr: "Mr.",
        mrs: "Mrs.",
        miss: "Miss.",
        name: "Name",
        last_name: "last name",
        birthday: "Birthday",
        house_numbe: "House number",
        village_no: "Village No.",
        province: "Province",
        district: "District",
        sub_district: "Sub-district",
        postal_code: "Postal Code",
        telephone_numbe: "Telephone numbe",
        email: "Email",
        confirm_password: "Confirm password",
        passwords_dont_match: "Passwords don't match",
        please_confirm_your_passwords_match: "Please confirm your passwords match.",
        save: "Save",
        male: "Male",
        female: "Female",
        incomplete_information: "Incomplete information",
        please_fill_in: "Please fill in",
        completely: "completely",
        ok: "Okay",
        close: "Close",
        invalid_email_format: "Invalid email format",
        please_enter_your_email_address_correctly: "Please enter your email address correctly.",
        found_duplicate_information: "Found duplicate information",
        this_information_is_already_in_use: "This information is already in use.",
        successfully_registered: "Successfully registered",
        unable_to_login: "Unable to login",
        please_contact_medical: "Please verify your identity via OTP.",
        login_successful: "Login successful",
        logout: "Logout",
        welcome_to: "Welcome to Smart Apppointments",
        login_failed: "Login failed",
        update_successful: "Update successful",
        error_updating_information: "There was an error updating information.",
        password_reset_successful: "Password reset successful",
        reset_password: "Reset password",
        reset_your_password_with_your_registered_mobileNo:
          "Reset your password with your registered mobile No.",
        notifications: "Notifications",
        make_an_appointment_with: "Make an appointment with",
        confirmed: "Confirmed",
        waiting_for_confirmation: "Waiting for confirmation",
        confirm_appointment: "Confirm appointment",
        cancel_appointment: "Cancel appointment",
        reset: "Reset",
        completed: "Completed",
        unknown_status: "Unknown",
        latest_appointment_list: "Latest appointment list",
        no_appointment_made: "No appointment made.",
        setting: "Setting",
        please_note: "Please note",
        appointment_date: "Appointment date",
        initial_symptoms: "Initial symptoms",
        all_articles: "All articles",
        no_information_found: "No information found",
        after_registering:
          "After registering for an appointment, a staff member will contact you back.",
        this_registration_will_record: "This registration will record personal information.",
        and_information_in_your:
          "and information in your registration To record as a history with the hospital. Please specify truthfully.",
        address: "Address",
        identificationType: "Identification Type",
        identificationNumber: "ID card/passport number",
        hospitalNumber: "HN",
        gender: "Prefix/Gender",
        firstName: "First Name",
        lastName: "Last Name",
        birthDate: "Birth Day",
        Address: "Address",
        villageNumber: "Village Number",
        mobileNo: "Telephone Number",
      },
    },
    lo: {
      translation: {
        hello: "ສະບາຍດີ, ທ່ານເຊົ້າໃຈ!",
        kasemrad_sriburin: "ເກສມຣັດ ສີບູຣິນທາຍ",
        hospital_you_trust: "ສະຫວັນແລະອ້າງອາຍຸຂອງທ່ານ",
        changeLanguage: "ປ່ຽນພາສາ",
        home: "ໜ້າຫຼັກ",
        register: "ລົງທະບຽນ",
        about: "ກ່ຽວກັບ",
        about_us: "ກ່ຽວກັບພວກເຮົາ",
        director: "ຜູ້ອຳນວຍການ",
        message_from_the_director: "ຂໍ້ຄວາມຈາກຜູ້ອຳນວຍການ",
        message_from_hospital_director: "ຂໍ້ຄວາມຈາກຜູ້ອຳນວຍການຂອງໂຮສາບ",
        hospital_history: "ປະຫວັດການຂອງໂຮສາບ",
        history: "ປະຫວັດ",
        appointment_history: "ປະຫວັດການການນັດຫມູ່",
        vision_and_mission: "ຮູບພາບແລະແຫລະລາຍງານ",
        accreditation: "ການຄິດວ່າງ",
        login: "ເຂົ້າສູ່ລະບົບ",
        our_services: "ການບໍລິການ",
        view_all: "ເບິ່ງທັງຫມົດ",
        room_services: "ການບໍລິການຫ້ອງ",
        packages: "ທົ່ວໄປແລະສະກົດພາບ",
        recommended_package: "ການສະແດງພາບ",
        view_all_packages: "ເບິ່ງທັງຫມົດພາບ",
        all_packages: "ທັງຫມົດພາບ",
        appointment_details: "ລາຍລະອຽດການນັດຫມູ່",
        view_details: "ເບິ່ງລາຍລະອຽດ",
        more_details: "ລາຍລະອຽດເພີ່ມເຕີມ",
        price: "ລາຄາ",
        expiration_date: "ວັນທີ່ໝົດອາຍຸ",
        promotion_period: "ຮອບເເກມເມື່ອ",
        time: "ເວລາ",
        date: "ວັນທີ",
        health_articles: "ບົດຮຽນການຂອງຄົນເຮົາ",
        kasemrad_article: "ບົດຮຽນຄະແນນ",
        view_all_articles: "ເບິ່ງບົດຮຽນທັງຫມົດ",
        read_more: "ເບິ່ງເພີ່ມ",
        news: "ຂ່າວ",
        doctor: "ທ່ານພະຍາກອນ",
        clinic: "ການສະແກນ",
        status: "ສະຖານະ",
        tool: "ເຄື່ອງມື",
        medical_service_center: "ສະຖານທິການສະແກນ",
        search_for_a_doctor: "ຄົ້ນຫາທ່ານພະຍາກອນ",
        search_by_name_expertise_and_others: "ຄົ້ນຫາຕົວເລືອກແລະອື່ນໆ",
        doctor_details: "ລາຍລະອຽດທ່ານພະຍາກອນ",
        doctor_expertise: "ພື້ນຖານຂອງທ່ານພະຍາກອນ",
        doctor_list: "ລາຍຊື່ທ່ານພະຍາກອນ",
        personal_information: "ຂໍ້ມູນສ່ວນຕົວ",
        congenital_disease: "ພາສາ/ລາວເຊື່ອນ",
        contact: "ຕິດຕໍ່",
        contact_us: "ຕິດຕໍ່ພວກເຮົາ",
        ask_for_information_on_treatment_and_services: "ຮັບຂໍ້ມູນກ່ຽວກັບການກວດສອບລະບົບ",
        appointment: "ການນັດຫມູ່",
        cookies:
          'ໃນທີ່ກົດ "ເພີ່ມຂ້ອຍທັງໝົດ"\n' +
          "ນີ້ແມ່ນທີ່ຜູ້ໃຊ້ກຳລັງອະນຸຍາດເພື່ອໃຊ້ງານຂໍ້ມູນສໍາລັບປະເທດລົງທະບຽນ.\n" +
          "ເພື່ອໃຊ້ງານເວັບນີ້ແລະເປັນສຳລັບຄົນເປັນປູ່ມທົ່ວໄປ.\n" +
          "ເພື່ອໃຊ້ງານຄວາມເປີດແລະໃຊ້ການວິໄສທີ່ສຸດ\n" +
          "ດຽວກັນເຄີຍເພື່ອກວດເບິ່ງທ່ານໄດ້ຈາກການສຳລັບການລົງທະບຽນ.\n" +
          "ນຳອອກຂໍ້ມູນເຊື່ອມຕໍ່ເຄື່ອງຂໍ້ມູນການໃຊ້ດີທີ່ມີການແບ່ງປັນ.",
        allow_all_cookies: "ເພີ່ມຂ້ອຍທັງໝົດ",
        appointment_with_doctor: "ການຈອງໝົດອາຍຸຂອງທ່ານ",
        book_an_appointment_online: "ຈອງລົງທະບຽນອອກຄວບຄຸມ",
        national_identification_number: "ເລກບັດປະຊາຊົນ",
        passport: "ປື້ມພົດປະຊາຊົນ",
        password: "ລະຫັດຜ່ານ",
        forgot_password: "ລືມລະຫັດຜ່ານຂອງທ່ານ?",
        no_account: "ບໍ່ມີບັນຊີ",
        terms_and_conditions_of_service: "ເງື່ອນໄຂແລະເງື່ອນໄຂຂອງການບໍລິການຈອງລົງທະບຽນອອກຄວບຄຸມ",
        read_and_agreed_to_the_terms: "ຂ້ອຍໄດ້ອ່ານແລະຍອມຮັບແລະຂອງການບໍລິການ.",
        unknown: "* ຖ້າທ່ານບໍ່ຮູ້, ຕື່ມເປັນ - *",
        hospital_number: "ເລກບັດຂອງສໍາລັບການຈອງລົງທະບຽນ",
        prefix: "ຄຳນາມລາວ",
        mr: "ທ່ານ",
        mrs: "ນາງ",
        miss: "ນາງທ້າວ",
        name: "ຊື່",
        last_name: "ນາມສະກຸນ",
        birthday: "ວັນເດືອນປີເກີດ",
        house_numbe: "ໝວດ",
        village_no: "ເຂົ້າສາຍ",
        province: "ແຂວງ",
        district: "ເມືອງ",
        sub_district: "ບ້ານ",
        postal_code: "ເລກໄປສະນີ",
        telephone_numbe: "ເບີໂທລະສັບ",
        email: "ອີເມວ",
        confirm_password: "ຢືນຢັນລະຫັດຜ່ານ",
        passwords_dont_match: "ລະຫັດຜ່ານບໍ່ກົງກັນ",
        please_confirm_your_passwords_match: "ກະລຸນາຢືນຢັນວ່າລະຫັດຜ່ານກົງກັນ.",
        save: "ບັນທຶກ",
        male: "ຊາຍ",
        female: "ຍິງ",
        incomplete_information: "ຂໍ້ມູນບໍ່ສະດວກ",
        please_fill_in: "ກະລຸນາສະແດງ",
        completely: "ສະຖານທີ່",
        ok: "ຕົກລົງ",
        close: "ປິດ",
        invalid_email_format: "ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ",
        please_enter_your_email_address_correctly: "ກະລຸນາປ້ອນອີເມວຂອງທ່ານຖືກຕ້ອງ.",
        found_duplicate_information: "ພົບຂໍ້ມູນສົມບັດ",
        this_information_is_already_in_use: "ຂໍ້ມູນນີ້ໄດ້ຖືກໃຊ້ແລ້ວ.",
        successfully_registered: "ລົງທະບຽນສຳເລັດ",
        unable_to_login: "ບໍ່ສາມາດເຂົ້າລະບົບ",
        please_contact_medical: "ກະລຸນາຕິດຕໍ່ການສໍາເລັດເພື່ອຢືນຢັນຂອງທ່ານ",
        login_successful: "ການເຂົ້າລະບົບສຳເລັດ",
        logout: "ອອກຈາກລະບົບ",
        welcome_to: "ຍິນດີຕົວຢ່າງ",
        login_failed: "ບໍ່ສາມາດເຂົ້າລະບົບ",
        update_successful: "ການປັບປຸງສຳເລັດ",
        error_updating_information: "ແກ້ໄຂຂໍ້ມູນມີຂໍ້ຜິດ",
        password_reset_successful: "ການຕັ້ງຄ່າລະຫັດຜ່ານສຳເລັດ",
        reset_password: "ຕັ້ງຄ່າລະຫັດຜ່ານ",
        reset_your_password_with_your_registered_email:
          "ຕັ້ງຄ່າລະຫັດຜ່ານຂອງທ່ານດ້ວຍອີເມວທີ່ລົງທະບຽນ",
        notifications: "ການແຈ້ງເຕືອນ",
        make_an_appointment_with: "ຈອງລົງທະບຽນດີ",
        confirmed: "ຢືນຢັນ",
        waiting_for_confirmation: "ການຢືນຢັນ",
        confirm_appointment: "ຢືນຢັນການຈອງ",
        cancel_appointment: "ຍົກເລີກການຈອງ",
        reset: "ຕັ້ງ",
        completed: "ສຳເລັດ",
        unknown_status: "ສະຖານະບໍ່ຮູ້ຈັກ",
        latest_appointment_list: "ລາຍຊື່ນັກສຶກສາຫຼ້າສຸດ",
        no_appointment_made: "ຍັງບໍ່ມີການນັກສຶກສາ",
        setting: "ຕັ້ງຄ່າ",
        please_note: "ກະລຸນາບັນທຶກ",
        appointment_date: "ວັນຈອງນັກສຶກສາ",
        initial_symptoms: "ບັນທຶກເລີ່ມຕົ້ນ",
        all_articles: "ບົດຄວາມທັງໝົດ",
        no_information_found: "ບໍ່ພົບຂໍ້ມູນ",
        after_registering: "ຫຼັງຈາກການລົງທະບຽນເພື່ອນັກສຶກສາ, ພວກເຮົາຈະຕິດຕໍ່ທ່ານອາດໃຫ້.",
        this_registration_will_record: "ການລົງທະບຽນນີ້ຈະບັນທຶກຂໍ້ມູນເດັດພະສາດຂອງທ່ານ.",
        and_information_in_your: "ແລະຂໍ້ມູນໃນການລົງທະບຽນຂອງທ່ານ. ກະລຸນາຢືນຢັນດ້ວຍຜົນ.",
        address: "ທີ່ຢູ່",
      },
    },
    zh: {
      translation: {
        hello: "你好，世界！",
        kasemrad_sriburin: "卡瑟姆拉德·斯里布林",
        hospital_you_trust: "你信任的医院",
        changeLanguage: "更改语言",
        home: "首页",
        register: "注册",
        about: "关于",
        about_us: "关于我们",
        director: "主任",
        message_from_the_director: "来自主任的消息",
        message_from_hospital_director: "医院主任的留言",
        hospital_history: "医院历史",
        history: "历史",
        appointment_history: "预约历史",
        vision_and_mission: "愿景与使命",
        accreditation: "认证",
        login: "登录",
        our_services: "我们的服务",
        view_all: "查看全部",
        room_services: "房间服务",
        packages: "套餐与促销",
        recommended_package: "推荐套餐",
        view_all_packages: "查看所有套餐",
        all_packages: "所有套餐",
        appointment_details: "预约详情",
        view_details: "查看详情",
        more_details: "更多详情",
        price: "价格",
        expiration_date: "截止日期",
        promotion_period: "促销期",
        time: "时间",
        date: "日期",
        health_articles: "健康文章",
        kasemrad_article: "卡瑟姆拉德文章",
        view_all_articles: "查看所有文章",
        read_more: "阅读更多",
        news: "新闻",
        doctor: "医生",
        clinic: "诊所",
        status: "状态",
        tool: "工具",
        medical_service_center: "医疗服务中心",
        search_for_a_doctor: "搜索医生",
        search_by_name_expertise_and_others: "按姓名、专业等搜索",
        doctor_details: "医生详情",
        doctor_expertise: "专业",
        doctor_list: "医生列表",
        personal_information: "个人信息",
        congenital_disease: "先天性疾病/药物过敏",
        contact: "联系方式",
        contact_us: "联系我们",
        ask_for_information_on_treatment_and_services: "咨询治疗和服务信息",
        appointment: "预约",
        cookies:
          "当点击“允许所有Cookie”\n" +
          "这意味着用户同意启用Cookie，用于以下目的。\n" +
          "以确保网站正常运行并充分发挥功能。\n" +
          "启用社交媒体功能\n" +
          "以及分析流量，以便将信息用于营销和广告。\n" +
          "包括与社交媒体合作伙伴共享使用数据。",
        allow_all_cookies: "允许所有Cookie",
        appointment_with_doctor: "预约医生",
        book_an_appointment_online: "在线预约",
        national_identification_number: "身份证号码",
        passport: "护照",
        password: "密码",
        forgot_password: "忘记密码？",
        no_account: "没有账号",
        terms_and_conditions_of_service: "在线预约服务条款",
        read_and_agreed_to_the_terms: "我已阅读并同意服务条款。",
        unknown: "* 如果您不知道，请填写 - *",
        hospital_number: "医院编号",
        prefix: "前缀",
        mr: "先生",
        mrs: "女士",
        miss: "小姐",
        name: "名字",
        last_name: "姓氏",
        birthday: "生日",
        house_numbe: "门牌号",
        village_no: "村庄号",
        province: "省",
        district: "区",
        sub_district: "街道",
        postal_code: "邮政编码",
        telephone_numbe: "电话号码",
        email: "电子邮件",
        confirm_password: "确认密码",
        passwords_dont_match: "密码不匹配",
        please_confirm_your_passwords_match: "请确认密码匹配。",
        save: "保存",
        male: "男性",
        female: "女性",
        incomplete_information: "信息不完整",
        please_fill_in: "请填写",
        completely: "完全",
        ok: "确定",
        close: "关闭",
        invalid_email_format: "无效的电子邮件格式",
        please_enter_your_email_address_correctly: "请正确输入您的电子邮件地址。",
        found_duplicate_information: "找到重复的信息",
        this_information_is_already_in_use: "此信息已在使用中。",
        successfully_registered: "注册成功",
        unable_to_login: "无法登录",
        please_contact_medical: "请联系专科医疗中心的医疗记录部确认您的身份",
        login_successful: "登录成功",
        logout: "登出",
        welcome_to: "欢迎来到智能预约",
        login_failed: "登录失败",
        update_successful: "更新成功",
        error_updating_information: "更新信息时出错。",
        password_reset_successful: "密码重置成功",
        reset_password: "重置密码",
        reset_your_password_with_your_registered_email: "使用注册的电子邮件重置密码。",
        notifications: "通知",
        make_an_appointment_with: "预约",
        confirmed: "已确认",
        waiting_for_confirmation: "等待确认",
        confirm_appointment: "确认预约",
        cancel_appointment: "取消预约",
        reset: "重置",
        completed: "已完成",
        unknown_status: "未知",
        latest_appointment_list: "最新预约列表",
        no_appointment_made: "未预约。",
        setting: "设置",
        please_note: "请注意",
        appointment_date: "预约日期",
        initial_symptoms: "初期症状",
        all_articles: "所有文章",
        no_information_found: "未找到信息",
        after_registering: "注册预约后，工作人员将与您联系。",
        this_registration_will_record: "此注册将记录个人信息。",
        and_information_in_your: "以及您的注册信息，以记录为医院的历史。请如实填写。",
        address: "地址",
      },
    },
    // Add more languages as needed
  },
  lng: localStorage.getItem("lng") || "en", // Default language
  fallbackLng: "th",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
