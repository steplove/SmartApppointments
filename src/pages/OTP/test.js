import React from "react";

function TestComponent() {
    void gotoVarifyOTP(telephone, verificationCode) async {
        //var refCode = md5(refText+telephone+verificationCode)
        refText = MyConfig.refText;
        otpSender = MyConfig.otpSender;
        keyauth = MyConfig.keyauth;
        var refCode =
            generateMd5(refText.toString() + telephone + verificationCode);
        var values = {
          'survey_id': keyid,
          'refText': refText,
          'otpSender': otpSender,
          'phone_for_send': telephone,
          'receive_opt': verificationCode
        };
    
        var url = MyConfig.otpVarifyURL;
        var xml =
            '<?xml version="1.0" encoding="UTF-8"?><REQ_DATA><SesID>$keyid</SesID><KEYAUTHEN>$keyauth</KEYAUTHEN><RefCode>$refCode</RefCode></REQ_DATA>';
        var body = {'xml': xml, 'url': url, 'values': values};
        final dio = Dio();
        var pathUrl =
            'https://apicon.bangkokchainhospital.com/varifyotp'; //MyConfig.apiUrl + '/sendotp';
    
        print(body);
        final response = await dio.post(
          pathUrl,
          data: body,
          options: Options(
            headers: {'Authorization': MyConfig.keyToken},
          ),
        );
        if (response.statusCode == 200) {
          print(response.data);
          var success_status = response.data['success'];
          if (success_status == true) {
            gotoConnectChannel();
          } else {
            buildAlertDiag();
          }
          // routeToOTP(surveyid, phoneforsend);
        }
      }
  return <div onClick={gotoOTP}>test</div>; // ปรับแต่งเหตุการณ์ onClick ตามที่ต้องการ
}

export default TestComponent;
