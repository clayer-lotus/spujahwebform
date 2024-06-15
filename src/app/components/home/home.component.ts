import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment  from 'moment-timezone';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentDateTime: Date = new Date();
  pickupTimes: { value: string, label: string }[] = [];
  selectedTime: string = "";
  selectedTimezone: string = "";
  name : string = "";
  email : string = "";
  timezones = [
    { value: "Africa/Abidjan", label: "Africa/Abidjan GMT+0:00" },
    { value: "Africa/Accra", label: "Africa/Accra GMT+0:00" },
    { value: "Africa/Addis_Ababa", label: "Africa/Addis_Ababa GMT+3:00" },
    { value: "Africa/Algiers", label: "Africa/Algiers GMT+1:00" },
    { value: "Africa/Asmara", label: "Africa/Asmara GMT+3:00" },
    { value: "Africa/Asmera", label: "Africa/Asmera GMT+3:00" },
    { value: "Africa/Bamako", label: "Africa/Bamako GMT+0:00" },
    { value: "Africa/Bangui", label: "Africa/Bangui GMT+1:00" },
    { value: "Africa/Banjul", label: "Africa/Banjul GMT+0:00" },
    { value: "Africa/Bissau", label: "Africa/Bissau GMT+0:00" },
    { value: "Africa/Blantyre", label: "Africa/Blantyre GMT+2:00" },
    { value: "Africa/Brazzaville", label: "Africa/Brazzaville GMT+1:00" },
    { value: "Africa/Bujumbura", label: "Africa/Bujumbura GMT+2:00" },
    { value: "Africa/Cairo", label: "Africa/Cairo GMT+2:00" },
    { value: "Africa/Casablanca", label: "Africa/Casablanca GMT+0:00" },
    { value: "Africa/Ceuta", label: "Africa/Ceuta GMT+1:00" },
    { value: "Africa/Conakry", label: "Africa/Conakry GMT+0:00" },
    { value: "Africa/Dakar", label: "Africa/Dakar GMT+0:00" },
    { value: "Africa/Dar_es_Salaam", label: "Africa/Dar_es_Salaam GMT+3:00" },
    { value: "Africa/Djibouti", label: "Africa/Djibouti GMT+3:00" },
    { value: "Africa/Douala", label: "Africa/Douala GMT+1:00" },
    { value: "Africa/El_Aaiun", label: "Africa/El_Aaiun GMT+0:00" },
    { value: "Africa/Freetown", label: "Africa/Freetown GMT+0:00" },
    { value: "Africa/Gaborone", label: "Africa/Gaborone GMT+2:00" },
    { value: "Africa/Harare", label: "Africa/Harare GMT+2:00" },
    { value: "Africa/Johannesburg", label: "Africa/Johannesburg GMT+2:00" },
    { value: "Africa/Juba", label: "Africa/Juba GMT+3:00" },
    { value: "Africa/Kampala", label: "Africa/Kampala GMT+3:00" },
    { value: "Africa/Khartoum", label: "Africa/Khartoum GMT+2:00" },
    { value: "Africa/Kigali", label: "Africa/Kigali GMT+2:00" },
    { value: "Africa/Kinshasa", label: "Africa/Kinshasa GMT+1:00" },
    { value: "Africa/Lagos", label: "Africa/Lagos GMT+1:00" },
    { value: "Africa/Libreville", label: "Africa/Libreville GMT+1:00" },
    { value: "Africa/Lome", label: "Africa/Lome GMT+0:00" },
    { value: "Africa/Luanda", label: "Africa/Luanda GMT+1:00" },
    { value: "Africa/Lubumbashi", label: "Africa/Lubumbashi GMT+2:00" },
    { value: "Africa/Lusaka", label: "Africa/Lusaka GMT+2:00" },
    { value: "Africa/Malabo", label: "Africa/Malabo GMT+1:00" },
    { value: "Africa/Maputo", label: "Africa/Maputo GMT+2:00" },
    { value: "Africa/Maseru", label: "Africa/Maseru GMT+2:00" },
    { value: "Africa/Mbabane", label: "Africa/Mbabane GMT+2:00" },
    { value: "Africa/Mogadishu", label: "Africa/Mogadishu GMT+3:00" },
    { value: "Africa/Monrovia", label: "Africa/Monrovia GMT+0:00" },
    { value: "Africa/Nairobi", label: "Africa/Nairobi GMT+3:00" },
    { value: "Africa/Ndjamena", label: "Africa/Ndjamena GMT+1:00" },
    { value: "Africa/Niamey", label: "Africa/Niamey GMT+1:00" },
    { value: "Africa/Nouakchott", label: "Africa/Nouakchott GMT+0:00" },
    { value: "Africa/Ouagadougou", label: "Africa/Ouagadougou GMT+0:00" },
    { value: "Africa/Porto-Novo", label: "Africa/Porto-Novo GMT+1:00" },
    { value: "Africa/Sao_Tome", label: "Africa/Sao_Tome GMT+0:00" },
    { value: "Africa/Timbuktu", label: "Africa/Timbuktu GMT+0:00" },
    { value: "Africa/Tripoli", label: "Africa/Tripoli GMT+2:00" },
    { value: "Africa/Tunis", label: "Africa/Tunis GMT+1:00" },
    { value: "Africa/Windhoek", label: "Africa/Windhoek GMT+2:00" },
    { value: "America/Adak", label: "America/Adak GMT-10:00" },
    { value: "America/Anchorage", label: "America/Anchorage GMT-9:00" },
    { value: "America/Anguilla", label: "America/Anguilla GMT-4:00" },
    { value: "America/Antigua", label: "America/Antigua GMT-4:00" },
    { value: "America/Araguaina", label: "America/Araguaina GMT-3:00" },
    { value: "America/Argentina/Buenos_Aires", label: "America/Argentina/Buenos_Aires GMT-3:00" },
    { value: "America/Argentina/Catamarca", label: "America/Argentina/Catamarca GMT-3:00" },
    { value: "America/Argentina/ComodRivadavia", label: "America/Argentina/ComodRivadavia GMT-3:00" },
    { value: "America/Argentina/Cordoba", label: "America/Argentina/Cordoba GMT-3:00" },
    { value: "America/Argentina/Jujuy", label: "America/Argentina/Jujuy GMT-3:00" },
    { value: "America/Argentina/La_Rioja", label: "America/Argentina/La_Rioja GMT-3:00" },
    { value: "America/Argentina/Mendoza", label: "America/Argentina/Mendoza GMT-3:00" },
    { value: "America/Argentina/Rio_Gallegos", label: "America/Argentina/Rio_Gallegos GMT-3:00" },
    { value: "America/Argentina/Salta", label: "America/Argentina/Salta GMT-3:00" },
    { value: "America/Argentina/San_Juan", label: "America/Argentina/San_Juan GMT-3:00" },
    { value: "America/Argentina/San_Luis", label: "America/Argentina/San_Luis GMT-3:00" },
    { value: "America/Argentina/Tucuman", label: "America/Argentina/Tucuman GMT-3:00" },
    { value: "America/Argentina/Ushuaia", label: "America/Argentina/Ushuaia GMT-3:00" },
    { value: "America/Aruba", label: "America/Aruba GMT-4:00" },
    { value: "America/Asuncion", label: "America/Asuncion GMT-4:00" },
    { value: "America/Atikokan", label: "America/Atikokan GMT-5:00" },
    { value: "America/Atka", label: "America/Atka GMT-10:00" },
    { value: "America/Bahia", label: "America/Bahia GMT-3:00" },
    { value: "America/Bahia_Banderas", label: "America/Bahia_Banderas GMT-6:00" },
    { value: "America/Barbados", label: "America/Barbados GMT-4:00" },
    { value: "America/Belem", label: "America/Belem GMT-3:00" },
    { value: "America/Belize", label: "America/Belize GMT-6:00" },
    { value: "America/Blanc-Sablon", label: "America/Blanc-Sablon GMT-4:00" },
    { value: "America/Boa_Vista", label: "America/Boa_Vista GMT-4:00" },
    { value: "America/Bogota", label: "America/Bogota GMT-5:00" },
    { value: "America/Boise", label: "America/Boise GMT-7:00" },
    { value: "America/Buenos_Aires", label: "America/Buenos_Aires GMT-3:00" },
    { value: "America/Cambridge_Bay", label: "America/Cambridge_Bay GMT-7:00" },
    { value: "America/Campo_Grande", label: "America/Campo_Grande GMT-4:00" },
    { value: "America/Cancun", label: "America/Cancun GMT-5:00" },
    { value: "America/Caracas", label: "America/Caracas GMT-4:00" },
    { value: "America/Catamarca", label: "America/Catamarca GMT-3:00" },
    { value: "America/Cayenne", label: "America/Cayenne GMT-3:00" },
    { value: "America/Cayman", label: "America/Cayman GMT-5:00" },
    { value: "America/Chicago", label: "America/Chicago GMT-6:00" },
    { value: "America/Chihuahua", label: "America/Chihuahua GMT-7:00" },
    { value: "America/Coral_Harbour", label: "America/Coral_Harbour GMT-5:00" },
    { value: "America/Cordoba", label: "America/Cordoba GMT-3:00" },
    { value: "America/Costa_Rica", label: "America/Costa_Rica GMT-6:00" },
    { value: "America/Creston", label: "America/Creston GMT-7:00" },
    { value: "America/Cuiaba", label: "America/Cuiaba GMT-4:00" },
    { value: "America/Curacao", label: "America/Curacao GMT-4:00" },
    { value: "America/Danmarkshavn", label: "America/Danmarkshavn GMT+0:00" },
    { value: "America/Dawson", label: "America/Dawson GMT-8:00" },
    { value: "America/Dawson_Creek", label: "America/Dawson_Creek GMT-7:00" },
    { value: "America/Denver", label: "America/Denver GMT-7:00" },
    { value: "America/Detroit", label: "America/Detroit GMT-5:00" },
    { value: "America/Dominica", label: "America/Dominica GMT-4:00" },
    { value: "America/Edmonton", label: "America/Edmonton GMT-7:00" },
    { value: "America/Eirunepe", label: "America/Eirunepe GMT-5:00" },
    { value: "America/El_Salvador", label: "America/El_Salvador GMT-6:00" },
    { value: "America/Ensenada", label: "America/Ensenada GMT-8:00" },
    { value: "America/Fort_Nelson", label: "America/Fort_Nelson GMT-7:00" },
    { value: "America/Fort_Wayne", label: "America/Fort_Wayne GMT-5:00" },
    { value: "America/Fortaleza", label: "America/Fortaleza GMT-3:00" },
    { value: "America/Glace_Bay", label: "America/Glace_Bay GMT-4:00" },
    { value: "America/Godthab", label: "America/Godthab GMT-3:00" },
    { value: "America/Goose_Bay", label: "America/Goose_Bay GMT-4:00" },
    { value: "America/Grand_Turk", label: "America/Grand_Turk GMT-5:00" },
    { value: "America/Grenada", label: "America/Grenada GMT-4:00" },
    { value: "America/Guadeloupe", label: "America/Guadeloupe GMT-4:00" },
    { value: "America/Guatemala", label: "America/Guatemala GMT-6:00" },
    { value: "America/Guayaquil", label: "America/Guayaquil GMT-5:00" },
    { value: "America/Guyana", label: "America/Guyana GMT-4:00" },
    { value: "America/Halifax", label: "America/Halifax GMT-4:00" },
    { value: "America/Havana", label: "America/Havana GMT-5:00" },
    { value: "America/Hermosillo", label: "America/Hermosillo GMT-7:00" },
    { value: "America/Indiana/Indianapolis", label: "America/Indiana/Indianapolis GMT-5:00" },
    { value: "America/Indiana/Knox", label: "America/Indiana/Knox GMT-6:00" },
    { value: "America/Indiana/Marengo", label: "America/Indiana/Marengo GMT-5:00" },
    { value: "America/Indiana/Petersburg", label: "America/Indiana/Petersburg GMT-5:00" },
    { value: "America/Indiana/Tell_City", label: "America/Indiana/Tell_City GMT-6:00" },
    { value: "America/Indiana/Vevay", label: "America/Indiana/Vevay GMT-5:00" },
    { value: "America/Indiana/Vincennes", label: "America/Indiana/Vincennes GMT-5:00" },
    { value: "America/Indiana/Winamac", label: "America/Indiana/Winamac GMT-5:00" },
    { value: "America/Indianapolis", label: "America/Indianapolis GMT-5:00" },
    { value: "America/Inuvik", label: "America/Inuvik GMT-7:00" },
    { value: "America/Iqaluit", label: "America/Iqaluit GMT-5:00" },
    { value: "America/Jamaica", label: "America/Jamaica GMT-5:00" },
    { value: "America/Jujuy", label: "America/Jujuy GMT-3:00" },
    { value: "America/Juneau", label: "America/Juneau GMT-9:00" },
    { value: "America/Kentucky/Louisville", label: "America/Kentucky/Louisville GMT-5:00" },
    { value: "America/Kentucky/Monticello", label: "America/Kentucky/Monticello GMT-5:00" },
    { value: "America/Knox_IN", label: "America/Knox_IN GMT-6:00" },
    { value: "America/Kralendijk", label: "America/Kralendijk GMT-4:00" },
    { value: "America/La_Paz", label: "America/La_Paz GMT-4:00" },
    { value: "America/Lima", label: "America/Lima GMT-5:00" },
    { value: "America/Los_Angeles", label: "America/Los_Angeles GMT-8:00" },
    { value: "America/Louisville", label: "America/Louisville GMT-5:00" },
    { value: "America/Lower_Princes", label: "America/Lower_Princes GMT-4:00" },
    { value: "America/Maceio", label: "America/Maceio GMT-3:00" },
    { value: "America/Managua", label: "America/Managua GMT-6:00" },
    { value: "America/Manaus", label: "America/Manaus GMT-4:00" },
    { value: "America/Marigot", label: "America/Marigot GMT-4:00" },
    { value: "America/Martinique", label: "America/Martinique GMT-4:00" },
    { value: "America/Matamoros", label: "America/Matamoros GMT-6:00" },
    { value: "America/Mazatlan", label: "America/Mazatlan GMT-7:00" },
    { value: "America/Barbados", label: "America/Barbados GMT-4:00" },
    { value: "America/Belem", label: "America/Belem GMT-3:00" },
    { value: "America/Belize", label: "America/Belize GMT-6:00" },
    { value: "America/Blanc-Sablon", label: "America/Blanc-Sablon GMT-4:00" },
    { value: "America/Boa_Vista", label: "America/Boa_Vista GMT-4:00" },
    { value: "America/Bogota", label: "America/Bogota GMT-5:00" },
    { value: "America/Boise", label: "America/Boise GMT-7:00" },
    { value: "America/Buenos_Aires", label: "America/Buenos_Aires GMT-3:00" },
    { value: "America/Cambridge_Bay", label: "America/Cambridge_Bay GMT-7:00" },
    { value: "America/Campo_Grande", label: "America/Campo_Grande GMT-4:00" },
    { value: "America/Cancun", label: "America/Cancun GMT-5:00" },
    { value: "America/Caracas", label: "America/Caracas GMT-4:00" },
    { value: "America/Catamarca", label: "America/Catamarca GMT-3:00" },
    { value: "America/Cayenne", label: "America/Cayenne GMT-3:00" },
    { value: "America/Cayman", label: "America/Cayman GMT-5:00" },
    { value: "America/Chicago", label: "America/Chicago GMT-6:00" },
    { value: "America/Chihuahua", label: "America/Chihuahua GMT-7:00" },
    { value: "America/Coral_Harbour", label: "America/Coral_Harbour GMT-5:00" },
    { value: "America/Cordoba", label: "America/Cordoba GMT-3:00" },
    { value: "America/Costa_Rica", label: "America/Costa_Rica GMT-6:00" },
    { value: "America/Creston", label: "America/Creston GMT-7:00" },
    { value: "America/Cuiaba", label: "America/Cuiaba GMT-4:00" },
    { value: "America/Curacao", label: "America/Curacao GMT-4:00" },
    { value: "America/Danmarkshavn", label: "America/Danmarkshavn GMT+0:00" },
    { value: "America/Dawson", label: "America/Dawson GMT-8:00" },
    { value: "America/Dawson_Creek", label: "America/Dawson_Creek GMT-7:00" },
    { value: "America/Denver", label: "America/Denver GMT-7:00" },
    { value: "America/Detroit", label: "America/Detroit GMT-5:00" },
    { value: "America/Dominica", label: "America/Dominica GMT-4:00" },
    { value: "America/Edmonton", label: "America/Edmonton GMT-7:00" },
    { value: "America/Eirunepe", label: "America/Eirunepe GMT-5:00" },
    { value: "America/El_Salvador", label: "America/El_Salvador GMT-6:00" },
    { value: "America/Ensenada", label: "America/Ensenada GMT-8:00" },
    { value: "America/Fort_Nelson", label: "America/Fort_Nelson GMT-7:00" },
    { value: "America/Fort_Wayne", label: "America/Fort_Wayne GMT-5:00" },
    { value: "America/Fortaleza", label: "America/Fortaleza GMT-3:00" },
    { value: "America/Glace_Bay", label: "America/Glace_Bay GMT-4:00" },
    { value: "America/Godthab", label: "America/Godthab GMT-3:00" },
    { value: "America/Goose_Bay", label: "America/Goose_Bay GMT-4:00" },
    { value: "America/Grand_Turk", label: "America/Grand_Turk GMT-5:00" },
    { value: "America/Grenada", label: "America/Grenada GMT-4:00" },
    { value: "America/Guadeloupe", label: "America/Guadeloupe GMT-4:00" },
    { value: "America/Guatemala", label: "America/Guatemala GMT-6:00" },
    { value: "America/Guayaquil", label: "America/Guayaquil GMT-5:00" },
    { value: "America/Guyana", label: "America/Guyana GMT-4:00" },
    { value: "America/Halifax", label: "America/Halifax GMT-4:00" },
    { value: "America/Havana", label: "America/Havana GMT-5:00" },
    { value: "America/Hermosillo", label: "America/Hermosillo GMT-7:00" },
    { value: "America/Indiana/Indianapolis", label: "America/Indiana/Indianapolis GMT-5:00" },
    { value: "America/Indiana/Knox", label: "America/Indiana/Knox GMT-6:00" },
    { value: "America/Indiana/Marengo", label: "America/Indiana/Marengo GMT-5:00" },
    { value: "America/Indiana/Petersburg", label: "America/Indiana/Petersburg GMT-5:00" },
    { value: "America/Indiana/Tell_City", label: "America/Indiana/Tell_City GMT-6:00" },
    { value: "America/Indiana/Vevay", label: "America/Indiana/Vevay GMT-5:00" },
    { value: "America/Indiana/Vincennes", label: "America/Indiana/Vincennes GMT-5:00" },
    { value: "America/Indiana/Winamac", label: "America/Indiana/Winamac GMT-5:00" },
    { value: "America/Indianapolis", label: "America/Indianapolis GMT-5:00" },
    { value: "America/Inuvik", label: "America/Inuvik GMT-7:00" },
    { value: "America/Iqaluit", label: "America/Iqaluit GMT-5:00" },
    { value: "America/Jamaica", label: "America/Jamaica GMT-5:00" },
    { value: "America/Jujuy", label: "America/Jujuy GMT-3:00" },
    { value: "America/Juneau", label: "America/Juneau GMT-9:00" },
    { value: "America/Kentucky/Louisville", label: "America/Kentucky/Louisville GMT-5:00" },
    { value: "America/Kentucky/Monticello", label: "America/Kentucky/Monticello GMT-5:00" },
    { value: "America/Knox_IN", label: "America/Knox_IN GMT-6:00" },
    { value: "America/Kralendijk", label: "America/Kralendijk GMT-4:00" },
    { value: "America/La_Paz", label: "America/La_Paz GMT-4:00" },
    { value: "America/Lima", label: "America/Lima GMT-5:00" },
    { value: "America/Los_Angeles", label: "America/Los_Angeles GMT-8:00" },
    { value: "America/Louisville", label: "America/Louisville GMT-5:00" },
    { value: "America/Lower_Princes", label: "America/Lower_Princes GMT-4:00" },
    { value: "America/Maceio", label: "America/Maceio GMT-3:00" },
    { value: "America/Managua", label: "America/Managua GMT-6:00" },
    { value: "America/Manaus", label: "America/Manaus GMT-4:00" },
    { value: "America/Marigot", label: "America/Marigot GMT-4:00" },
    { value: "America/Martinique", label: "America/Martinique GMT-4:00" },
    { value: "America/Matamoros", label: "America/Matamoros GMT-6:00" },
    { value: "America/Mazatlan", label: "America/Mazatlan GMT-7:00" },
    { value: "Asia/Aden", label: "Asia/Aden GMT+3:00" },
    { value: "Asia/Almaty", label: "Asia/Almaty GMT+6:00" },
    { value: "Asia/Amman", label: "Asia/Amman GMT+3:00" },
    { value: "Asia/Anadyr", label: "Asia/Anadyr GMT+12:00" },
    { value: "Asia/Aqtau", label: "Asia/Aqtau GMT+5:00" },
    { value: "Asia/Aqtobe", label: "Asia/Aqtobe GMT+5:00" },
    { value: "Asia/Ashgabat", label: "Asia/Ashgabat GMT+5:00" },
    { value: "Asia/Atyrau", label: "Asia/Atyrau GMT+5:00" },
    { value: "Asia/Baghdad", label: "Asia/Baghdad GMT+3:00" },
    { value: "Asia/Bahrain", label: "Asia/Bahrain GMT+3:00" },
    { value: "Asia/Baku", label: "Asia/Baku GMT+4:00" },
    { value: "Asia/Bangkok", label: "Asia/Bangkok GMT+7:00" },
    { value: "Asia/Barnaul", label: "Asia/Barnaul GMT+7:00" },
    { value: "Asia/Beirut", label: "Asia/Beirut GMT+3:00" },
    { value: "Asia/Bishkek", label: "Asia/Bishkek GMT+6:00" },
    { value: "Asia/Brunei", label: "Asia/Brunei GMT+8:00" },
    { value: "Asia/Calcutta", label: "Asia/Calcutta GMT+5:30" },
    { value: "Asia/Chita", label: "Asia/Chita GMT+9:00" },
    { value: "Asia/Choibalsan", label: "Asia/Choibalsan GMT+8:00" },
    { value: "Asia/Colombo", label: "Asia/Colombo GMT+5:30" },
    { value: "Asia/Damascus", label: "Asia/Damascus GMT+3:00" },
    { value: "Asia/Dhaka", label: "Asia/Dhaka GMT+6:00" },
    { value: "Asia/Dili", label: "Asia/Dili GMT+9:00" },
    { value: "Asia/Dubai", label: "Asia/Dubai GMT+4:00" },
    { value: "Asia/Dushanbe", label: "Asia/Dushanbe GMT+5:00" },
    { value: "Asia/Famagusta", label: "Asia/Famagusta GMT+3:00" },
    { value: "Asia/Gaza", label: "Asia/Gaza GMT+3:00" },
    { value: "Asia/Hebron", label: "Asia/Hebron GMT+3:00" },
    { value: "Asia/Ho_Chi_Minh", label: "Asia/Ho_Chi_Minh GMT+7:00" },
    { value: "Asia/Hong_Kong", label: "Asia/Hong_Kong GMT+8:00" },
    { value: "Asia/Hovd", label: "Asia/Hovd GMT+7:00" },
    { value: "Asia/Irkutsk", label: "Asia/Irkutsk GMT+8:00" },
    { value: "Asia/Jakarta", label: "Asia/Jakarta GMT+7:00" },
    { value: "Asia/Jayapura", label: "Asia/Jayapura GMT+9:00" },
    { value: "Asia/Jerusalem", label: "Asia/Jerusalem GMT+3:00" },
    { value: "Asia/Kabul", label: "Asia/Kabul GMT+4:30" },
    { value: "Asia/Kamchatka", label: "Asia/Kamchatka GMT+12:00" },
    { value: "Asia/Karachi", label: "Asia/Karachi GMT+5:00" },
    { value: "Asia/Kathmandu", label: "Asia/Kathmandu GMT+5:45" },
    { value: "Asia/Khandyga", label: "Asia/Khandyga GMT+9:00" },
    { value: "Asia/Kolkata", label: "Asia/Kolkata GMT+5:30" },
    { value: "Asia/Krasnoyarsk", label: "Asia/Krasnoyarsk GMT+7:00" },
    { value: "Asia/Kuala_Lumpur", label: "Asia/Kuala_Lumpur GMT+8:00" },
    { value: "Asia/Kuching", label: "Asia/Kuching GMT+8:00" },
    { value: "Asia/Kuwait", label: "Asia/Kuwait GMT+3:00" },
    { value: "Asia/Macau", label: "Asia/Macau GMT+8:00" },
    { value: "Asia/Magadan", label: "Asia/Magadan GMT+11:00" },
    { value: "Asia/Makassar", label: "Asia/Makassar GMT+8:00" },
    { value: "Asia/Manila", label: "Asia/Manila GMT+8:00" },
    { value: "Asia/Muscat", label: "Asia/Muscat GMT+4:00" },
    { value: "Asia/Nicosia", label: "Asia/Nicosia GMT+3:00" },
    { value: "Asia/Novokuznetsk", label: "Asia/Novokuznetsk GMT+7:00" },
    { value: "Asia/Novosibirsk", label: "Asia/Novosibirsk GMT+7:00" },
    { value: "Asia/Omsk", label: "Asia/Omsk GMT+6:00" },
    { value: "Asia/Oral", label: "Asia/Oral GMT+5:00" },
    { value: "Asia/Phnom_Penh", label: "Asia/Phnom_Penh GMT+7:00" },
    { value: "Asia/Pontianak", label: "Asia/Pontianak GMT+7:00" },
    { value: "Asia/Pyongyang", label: "Asia/Pyongyang GMT+9:00" },
    { value: "Asia/Qatar", label: "Asia/Qatar GMT+3:00" },
    { value: "Asia/Qostanay", label: "Asia/Qostanay GMT+6:00" },
    { value: "Asia/Qyzylorda", label: "Asia/Qyzylorda GMT+6:00" },
    { value: "Asia/Riyadh", label: "Asia/Riyadh GMT+3:00" },
    { value: "Asia/Saigon", label: "Asia/Saigon GMT+7:00" },
    { value: "Asia/Sakhalin", label: "Asia/Sakhalin GMT+11:00" },
    { value: "Asia/Samarkand", label: "Asia/Samarkand GMT+5:00" },
    { value: "Asia/Seoul", label: "Asia/Seoul GMT+9:00" },
    { value: "Asia/Shanghai", label: "Asia/Shanghai GMT+8:00" },
    { value: "Asia/Singapore", label: "Asia/Singapore GMT+8:00" },
    { value: "Asia/Srednekolymsk", label: "Asia/Srednekolymsk GMT+11:00" },
    { value: "Asia/Taipei", label: "Asia/Taipei GMT+8:00" },
    { value: "Asia/Tashkent", label: "Asia/Tashkent GMT+5:00" },
    { value: "Asia/Tbilisi", label: "Asia/Tbilisi GMT+4:00" },
    { value: "Asia/Tehran", label: "Asia/Tehran GMT+3:30" },
    { value: "Asia/Thimbu", label: "Asia/Thimbu GMT+6:00" },
    { value: "Asia/Thimphu", label: "Asia/Thimphu GMT+6:00" },
    { value: "Asia/Tokyo", label: "Asia/Tokyo GMT+9:00" },
    { value: "Asia/Tomsk", label: "Asia/Tomsk GMT+7:00" },
    { value: "Asia/Ulaanbaatar", label: "Asia/Ulaanbaatar GMT+8:00" },
    { value: "Asia/Ulan_Bator", label: "Asia/Ulan_Bator GMT+8:00" },
    { value: "Asia/Urumqi", label: "Asia/Urumqi GMT+6:00" },
    { value: "Asia/Ust-Nera", label: "Asia/Ust-Nera GMT+10:00" },
    { value: "Asia/Vientiane", label: "Asia/Vientiane GMT+7:00" },
    { value: "Asia/Vladivostok", label: "Asia/Vladivostok GMT+10:00" },
    { value: "Asia/Yakutsk", label: "Asia/Yakutsk GMT+9:00" },
    { value: "Asia/Yangon", label: "Asia/Yangon GMT+6:30" },
    { value: "Asia/Yekaterinburg", label: "Asia/Yekaterinburg GMT+5:00" },
    { value: "Asia/Yerevan", label: "Asia/Yerevan GMT+4:00" },
    { value: "Atlantic/Azores", label: "Atlantic/Azores GMT-1:00" },
    { value: "Atlantic/Bermuda", label: "Atlantic/Bermuda GMT-4:00" },
    { value: "Atlantic/Canary", label: "Atlantic/Canary GMT+0:00" },
    { value: "Atlantic/Cape_Verde", label: "Atlantic/Cape_Verde GMT-1:00" },
    { value: "Atlantic/Faeroe", label: "Atlantic/Faeroe GMT+0:00" },
    { value: "Atlantic/Faroe", label: "Atlantic/Faroe GMT+0:00" },
    { value: "Atlantic/Jan_Mayen", label: "Atlantic/Jan_Mayen GMT+1:00" },
    { value: "Atlantic/Madeira", label: "Atlantic/Madeira GMT+0:00" },
    { value: "Atlantic/Reykjavik", label: "Atlantic/Reykjavik GMT+0:00" },
    { value: "Atlantic/South_Georgia", label: "Atlantic/South_Georgia GMT-2:00" },
    { value: "Atlantic/St_Helena", label: "Atlantic/St_Helena GMT+0:00" },
    { value: "Atlantic/Stanley", label: "Atlantic/Stanley GMT-3:00" },
    { value: "Australia/ACT", label: "Australia/ACT GMT+10:00" },
    { value: "Australia/Adelaide", label: "Australia/Adelaide GMT+9:30" },
    { value: "Australia/Brisbane", label: "Australia/Brisbane GMT+10:00" },
    { value: "Australia/Broken_Hill", label: "Australia/Broken_Hill GMT+9:30" },
    { value: "Australia/Canberra", label: "Australia/Canberra GMT+10:00" },
    { value: "Australia/Currie", label: "Australia/Currie GMT+10:00" },
    { value: "Australia/Darwin", label: "Australia/Darwin GMT+9:30" },
    { value: "Australia/Eucla", label: "Australia/Eucla GMT+8:45" },
    { value: "Australia/Hobart", label: "Australia/Hobart GMT+10:00" },
    { value: "Australia/LHI", label: "Australia/LHI GMT+10:30" },
    { value: "Australia/Lindeman", label: "Australia/Lindeman GMT+10:00" },
    { value: "Australia/Lord_Howe", label: "Australia/Lord_Howe GMT+10:30" },
    { value: "Australia/Melbourne", label: "Australia/Melbourne GMT+10:00" },
    { value: "Australia/NSW", label: "Australia/NSW GMT+10:00" },
    { value: "Australia/North", label: "Australia/North GMT+9:30" },
    { value: "Australia/Perth", label: "Australia/Perth GMT+8:00" },
    { value: "Australia/Queensland", label: "Australia/Queensland GMT+10:00" },
    { value: "Australia/South", label: "Australia/South GMT+9:30" },
    { value: "Australia/Sydney", label: "Australia/Sydney GMT+10:00" },
    { value: "Australia/Tasmania", label: "Australia/Tasmania GMT+10:00" },
    { value: "Australia/Victoria", label: "Australia/Victoria GMT+10:00" },
    { value: "Australia/West", label: "Australia/West GMT+8:00" },
    { value: "Australia/Yancowinna", label: "Australia/Yancowinna GMT+9:30" },
    { value: "Brazil/Acre", label: "Brazil/Acre GMT-5:00" },
    { value: "Brazil/DeNoronha", label: "Brazil/DeNoronha GMT-2:00" },
    { value: "Brazil/East", label: "Brazil/East GMT-3:00" },
    { value: "Brazil/West", label: "Brazil/West GMT-4:00" },
    { value: "CET", label: "CET GMT+1:00" },
    { value: "CST6CDT", label: "CST6CDT GMT-6:00" },
    { value: "Canada/Atlantic", label: "Canada/Atlantic GMT-4:00" },
    { value: "Canada/Central", label: "Canada/Central GMT-6:00" },
    { value: "Canada/Eastern", label: "Canada/Eastern GMT-5:00" },
    { value: "Canada/Mountain", label: "Canada/Mountain GMT-7:00" },
    { value: "Canada/Newfoundland", label: "Canada/Newfoundland GMT-4:30" },
    { value: "Canada/Pacific", label: "Canada/Pacific GMT-8:00" },
    { value: "Canada/Saskatchewan", label: "Canada/Saskatchewan GMT-6:00" },
    { value: "Canada/Yukon", label: "Canada/Yukon GMT-8:00" },
    { value: "Chile/Continental", label: "Chile/Continental GMT-4:00" },
    { value: "Chile/EasterIsland", label: "Chile/EasterIsland GMT-6:00" },
    { value: "Cuba", label: "Cuba GMT-5:00" },
    { value: "EET", label: "EET GMT+2:00" },
    { value: "EST5EDT", label: "EST5EDT GMT-5:00" },
    { value: "Egypt", label: "Egypt GMT+2:00" },
    { value: "Eire", label: "Eire GMT+0:00" },
    { value: "Etc/GMT", label: "Etc/GMT GMT+0:00" },
    { value: "Etc/GMT+0", label: "Etc/GMT+0 GMT+0:00" },
    { value: "Etc/GMT+1", label: "Etc/GMT+1 GMT-1:00" },
    { value: "Etc/GMT+10", label: "Etc/GMT+10 GMT-10:00" },
    { value: "Etc/GMT+11", label: "Etc/GMT+11 GMT-11:00" },
    { value: "Etc/GMT+12", label: "Etc/GMT+12 GMT-12:00" },
    { value: "Etc/GMT+2", label: "Etc/GMT+2 GMT-2:00" },
    { value: "Etc/GMT+3", label: "Etc/GMT+3 GMT-3:00" },
    { value: "Etc/GMT+4", label: "Etc/GMT+4 GMT-4:00" },
    { value: "Etc/GMT+5", label: "Etc/GMT+5 GMT-5:00" },
    { value: "Etc/GMT+6", label: "Etc/GMT+6 GMT-6:00" },
    { value: "Etc/GMT+7", label: "Etc/GMT+7 GMT-7:00" },
    { value: "Etc/GMT+8", label: "Etc/GMT+8 GMT-8:00" },
    { value: "Etc/GMT+9", label: "Etc/GMT+9 GMT-9:00" },
    { value: "Etc/GMT-0", label: "Etc/GMT-0 GMT+0:00" },
    { value: "Etc/GMT-1", label: "Etc/GMT-1 GMT+1:00" },
    { value: "Etc/GMT-10", label: "Etc/GMT-10 GMT+10:00" },
    { value: "Etc/GMT-11", label: "Etc/GMT-11 GMT+11:00" },
    { value: "Etc/GMT-12", label: "Etc/GMT-12 GMT+12:00" },
    { value: "Etc/GMT-13", label: "Etc/GMT-13 GMT+13:00" },
    { value: "Etc/GMT-14", label: "Etc/GMT-14 GMT+14:00" },
    { value: "Etc/GMT-2", label: "Etc/GMT-2 GMT+2:00" },
    { value: "Etc/GMT-3", label: "Etc/GMT-3 GMT+3:00" },
    { value: "Etc/GMT-4", label: "Etc/GMT-4 GMT+4:00" },
    { value: "Etc/GMT-5", label: "Etc/GMT-5 GMT+5:00" },
    { value: "Etc/GMT-6", label: "Etc/GMT-6 GMT+6:00" },
    { value: "Etc/GMT-7", label: "Etc/GMT-7 GMT+7:00" },
    { value: "Etc/GMT-8", label: "Etc/GMT-8 GMT+8:00" },
    { value: "Etc/GMT-9", label: "Etc/GMT-9 GMT+9:00" },
    { value: "Etc/Greenwich", label: "Etc/Greenwich GMT+0:00" },
    { value: "Etc/UCT", label: "Etc/UCT GMT+0:00" },
    { value: "Etc/UTC", label: "Etc/UTC GMT+0:00" },
    { value: "Etc/Universal", label: "Etc/Universal GMT+0:00" },
    { value: "Etc/Zulu", label: "Etc/Zulu GMT+0:00" },
    { value: "Europe/Amsterdam", label: "Europe/Amsterdam GMT+1:00" },
    { value: "Europe/Andorra", label: "Europe/Andorra GMT+1:00" },
    { value: "Europe/Athens", label: "Europe/Athens GMT+2:00" },
    { value: "Europe/Belfast", label: "Europe/Belfast GMT+0:00" },
    { value: "Europe/Belgrade", label: "Europe/Belgrade GMT+1:00" },
    { value: "Europe/Berlin", label: "Europe/Berlin GMT+1:00" },
    { value: "Europe/Bratislava", label: "Europe/Bratislava GMT+1:00" },
    { value: "Europe/Brussels", label: "Europe/Brussels GMT+1:00" },
    { value: "Europe/Bucharest", label: "Europe/Bucharest GMT+2:00" },
    { value: "Europe/Budapest", label: "Europe/Budapest GMT+1:00" },
    { value: "Europe/Chisinau", label: "Europe/Chisinau GMT+2:00" },
    { value: "Europe/Copenhagen", label: "Europe/Copenhagen GMT+1:00" },
    { value: "Europe/Dublin", label: "Europe/Dublin GMT+0:00" },
    { value: "Europe/Gibraltar", label: "Europe/Gibraltar GMT+1:00" },
    { value: "Europe/Guernsey", label: "Europe/Guernsey GMT+0:00" },
    { value: "Europe/Helsinki", label: "Europe/Helsinki GMT+2:00" },
    { value: "Europe/Isle_of_Man", label: "Europe/Isle_of_Man GMT+0:00" },
    { value: "Europe/Istanbul", label: "Europe/Istanbul GMT+2:00" },
    { value: "Europe/Jersey", label: "Europe/Jersey GMT+0:00" },
    { value: "Europe/Kaliningrad", label: "Europe/Kaliningrad GMT+2:00" },
    { value: "Europe/Kiev", label: "Europe/Kiev GMT+2:00" },
    { value: "Europe/Lisbon", label: "Europe/Lisbon GMT+0:00" },
    { value: "Europe/Ljubljana", label: "Europe/Ljubljana GMT+1:00" },
    { value: "Europe/London", label: "Europe/London GMT+0:00" },
    { value: "Europe/Luxembourg", label: "Europe/Luxembourg GMT+1:00" },
    { value: "Europe/Madrid", label: "Europe/Madrid GMT+1:00" },
    { value: "Europe/Malta", label: "Europe/Malta GMT+1:00" },
    { value: "Europe/Mariehamn", label: "Europe/Mariehamn GMT+2:00" },
    { value: "Europe/Minsk", label: "Europe/Minsk GMT+3:00" },
    { value: "Europe/Monaco", label: "Europe/Monaco GMT+1:00" },
    { value: "Europe/Moscow", label: "Europe/Moscow GMT+3:00" },
    { value: "Europe/Nicosia", label: "Europe/Nicosia GMT+2:00" },
    { value: "Europe/Oslo", label: "Europe/Oslo GMT+1:00" },
    { value: "Europe/Paris", label: "Europe/Paris GMT+1:00" },
    { value: "Europe/Podgorica", label: "Europe/Podgorica GMT+1:00" },
    { value: "Europe/Prague", label: "Europe/Prague GMT+1:00" },
    { value: "Europe/Riga", label: "Europe/Riga GMT+2:00" },
    { value: "Europe/Rome", label: "Europe/Rome GMT+1:00" },
    { value: "Europe/Samara", label: "Europe/Samara GMT+4:00" },
    { value: "Europe/San_Marino", label: "Europe/San_Marino GMT+1:00" },
    { value: "Europe/Sarajevo", label: "Europe/Sarajevo GMT+1:00" },
    { value: "Europe/Simferopol", label: "Europe/Simferopol GMT+3:00" },
    { value: "Europe/Skopje", label: "Europe/Skopje GMT+1:00" },
    { value: "Europe/Sofia", label: "Europe/Sofia GMT+2:00" },
    { value: "Europe/Stockholm", label: "Europe/Stockholm GMT+1:00" },
    { value: "Europe/Tallinn", label: "Europe/Tallinn GMT+2:00" },
    { value: "Europe/Tirane", label: "Europe/Tirane GMT+1:00" },
    { value: "Europe/Tiraspol", label: "Europe/Tiraspol GMT+2:00" },
    { value: "Europe/Uzhgorod", label: "Europe/Uzhgorod GMT+2:00" },
    { value: "Europe/Vaduz", label: "Europe/Vaduz GMT+1:00" },
    { value: "Europe/Vatican", label: "Europe/Vatican GMT+1:00" },
    { value: "Europe/Vienna", label: "Europe/Vienna GMT+1:00" },
    { value: "Europe/Vilnius", label: "Europe/Vilnius GMT+2:00" },
    { value: "Europe/Volgograd", label: "Europe/Volgograd GMT+4:00" },
    { value: "Europe/Warsaw", label: "Europe/Warsaw GMT+1:00" },
    { value: "Europe/Zagreb", label: "Europe/Zagreb GMT+1:00" },
    { value: "Europe/Zaporozhye", label: "Europe/Zaporozhye GMT+2:00" },
    { value: "Europe/Zurich", label: "Europe/Zurich GMT+1:00" },
    { value: "GB", label: "GB GMT+0:00" },
    { value: "GB-Eire", label: "GB-Eire GMT+0:00" },
    { value: "GMT", label: "GMT GMT+0:00" },
    { value: "GMT+0", label: "GMT+0 GMT+0:00" },
    { value: "GMT-0", label: "GMT-0 GMT+0:00" },
    { value: "GMT0", label: "GMT0 GMT+0:00" },
    { value: "Greenwich", label: "Greenwich GMT+0:00" },
    { value: "HST", label: "HST GMT-10:00" },
    { value: "Hongkong", label: "Hongkong GMT+8:00" },
    { value: "Iceland", label: "Iceland GMT+0:00" },
    { value: "Indian/Antananarivo", label: "Indian/Antananarivo GMT+3:00" },
    { value: "Indian/Chagos", label: "Indian/Chagos GMT+6:00" },
    { value: "Indian/Christmas", label: "Indian/Christmas GMT+7:00" },
    { value: "Indian/Cocos", label: "Indian/Cocos GMT+6:30" },
    { value: "Indian/Comoro", label: "Indian/Comoro GMT+3:00" },
    { value: "Indian/Kerguelen", label: "Indian/Kerguelen GMT+5:00" },
    { value: "Indian/Mahe", label: "Indian/Mahe GMT+4:00" },
    { value: "Indian/Maldives", label: "Indian/Maldives GMT+5:00" },
    { value: "Indian/Mauritius", label: "Indian/Mauritius GMT+4:00" },
    { value: "Indian/Mayotte", label: "Indian/Mayotte GMT+3:00" },
    { value: "Indian/Reunion", label: "Indian/Reunion GMT+4:00" },
    { value: "Iran", label: "Iran GMT+3:30" },
    { value: "Israel", label: "Israel GMT+2:00" },
    { value: "Jamaica", label: "Jamaica GMT-5:00" },
    { value: "Japan", label: "Japan GMT+9:00" },
    { value: "Kwajalein", label: "Kwajalein GMT+12:00" },
    { value: "Libya", label: "Libya GMT+2:00" },
    { value: "MET", label: "MET GMT+1:00" },
    { value: "MST", label: "MST GMT-7:00" },
    { value: "MST7MDT", label: "MST7MDT GMT-7:00" },
    { value: "Mexico/BajaNorte", label: "Mexico/BajaNorte GMT-8:00" },
    { value: "Mexico/BajaSur", label: "Mexico/BajaSur GMT-7:00" },
    { value: "Mexico/General", label: "Mexico/General GMT-6:00" },
    { value: "NZ", label: "NZ GMT+12:00" },
    { value: "NZ-CHAT", label: "NZ-CHAT GMT+12:45" },
    { value: "Navajo", label: "Navajo GMT-7:00" },
    { value: "PRC", label: "PRC GMT+8:00" },
    { value: "PST8PDT", label: "PST8PDT GMT-8:00" },
    { value: "Pacific/Apia", label: "Pacific/Apia GMT+13:00" },
    { value: "Pacific/Auckland", label: "Pacific/Auckland GMT+12:00" },
    { value: "Pacific/Chatham", label: "Pacific/Chatham GMT+12:45" },
    { value: "Pacific/Easter", label: "Pacific/Easter GMT-6:00" },
    { value: "Pacific/Efate", label: "Pacific/Efate GMT+11:00" },
    { value: "Pacific/Enderbury", label: "Pacific/Enderbury GMT+13:00" },
    { value: "Pacific/Fakaofo", label: "Pacific/Fakaofo GMT+13:00" },
    { value: "Pacific/Fiji", label: "Pacific/Fiji GMT+12:00" },
    { value: "Pacific/Funafuti", label: "Pacific/Funafuti GMT+12:00" },
    { value: "Pacific/Galapagos", label: "Pacific/Galapagos GMT-6:00" },
    { value: "Pacific/Gambier", label: "Pacific/Gambier GMT-9:00" },
    { value: "Pacific/Guadalcanal", label: "Pacific/Guadalcanal GMT+11:00" },
    { value: "Pacific/Guam", label: "Pacific/Guam GMT+10:00" },
    { value: "Pacific/Honolulu", label: "Pacific/Honolulu GMT-10:00" },
    { value: "Pacific/Johnston", label: "Pacific/Johnston GMT-10:00" },
    { value: "Pacific/Kiritimati", label: "Pacific/Kiritimati GMT+14:00" },
    { value: "Pacific/Kosrae", label: "Pacific/Kosrae GMT+11:00" },
    { value: "Pacific/Kwajalein", label: "Pacific/Kwajalein GMT+12:00" },
    { value: "Pacific/Majuro", label: "Pacific/Majuro GMT+12:00" },
    { value: "Pacific/Marquesas", label: "Pacific/Marquesas GMT-9:30" },
    { value: "Pacific/Midway", label: "Pacific/Midway GMT-11:00" },
    { value: "Pacific/Nauru", label: "Pacific/Nauru GMT+12:00" },
    { value: "Pacific/Niue", label: "Pacific/Niue GMT-11:00" },
    { value: "Pacific/Norfolk", label: "Pacific/Norfolk GMT+11:00" },
    { value: "Pacific/Noumea", label: "Pacific/Noumea GMT+11:00" },
    { value: "Pacific/Pago_Pago", label: "Pacific/Pago_Pago GMT-11:00" },
    { value: "Pacific/Palau", label: "Pacific/Palau GMT+9:00" },
    { value: "Pacific/Pitcairn", label: "Pacific/Pitcairn GMT-8:00" },
    { value: "Pacific/Ponape", label: "Pacific/Ponape GMT+11:00" },
    { value: "Pacific/Port_Moresby", label: "Pacific/Port_Moresby GMT+10:00" },
    { value: "Pacific/Rarotonga", label: "Pacific/Rarotonga GMT-10:00" },
    { value: "Pacific/Saipan", label: "Pacific/Saipan GMT+10:00" },
    { value: "Pacific/Tahiti", label: "Pacific/Tahiti GMT-10:00" },
    { value: "Pacific/Tarawa", label: "Pacific/Tarawa GMT+12:00" },
    { value: "Pacific/Tongatapu", label: "Pacific/Tongatapu GMT+13:00" },
    { value: "Pacific/Truk", label: "Pacific/Truk GMT+10:00" },
    { value: "Pacific/Wake", label: "Pacific/Wake GMT+12:00" },
    { value: "Pacific/Wallis", label: "Pacific/Wallis GMT+12:00" },
    { value: "Pacific/Yap", label: "Pacific/Yap GMT+10:00" },
    { value: "Poland", label: "Poland GMT+1:00" },
    { value: "Portugal", label: "Portugal GMT+0:00" },
    { value: "ROC", label: "ROC GMT+8:00" },
    { value: "ROK", label: "ROK GMT+9:00" },
    { value: "Singapore", label: "Singapore GMT+8:00" },
    { value: "Turkey", label: "Turkey GMT+2:00" },
    { value: "UCT", label: "UCT GMT+0:00" },
    { value: "US/Alaska", label: "US/Alaska GMT-9:00" },
    { value: "US/Aleutian", label: "US/Aleutian GMT-10:00" },
    { value: "US/Arizona", label: "US/Arizona GMT-7:00" },
    { value: "US/Central", label: "US/Central GMT-6:00" },
    { value: "US/East-Indiana", label: "US/East-Indiana GMT-5:00" },
    { value: "US/Eastern", label: "US/Eastern GMT-5:00" },
    { value: "US/Hawaii", label: "US/Hawaii GMT-10:00" },
    { value: "US/Indiana-Starke", label: "US/Indiana-Starke GMT-6:00" },
    { value: "US/Michigan", label: "US/Michigan GMT-5:00" },
    { value: "US/Mountain", label: "US/Mountain GMT-7:00" },
    { value: "US/Pacific", label: "US/Pacific GMT-8:00" },
    { value: "US/Samoa", label: "US/Samoa GMT-11:00" },
    { value: "UTC", label: "UTC GMT+0:00" },
    { value: "Universal", label: "Universal GMT+0:00" },
    { value: "W-SU", label: "W-SU GMT+3:00" },
    { value: "WET", label: "WET GMT+0:00" },
    { value: "Zulu", label: "Zulu GMT+0:00" }
  ];
  howDidYouHear: string = 'Social Media';

  constructor(private http: HttpClient, private spinner : NgxSpinnerService,  private router: Router,) {
  }
  ngOnInit() {
    this.currentDateTime = new Date();
    this.populateTimeOptions();
    this.setDefaultTimezone();
  }  populateTimeOptions() {
    const nearestSlot = this.getNearestSlot(new Date());

    // Reset pickupTimes array
    this.pickupTimes = [];

    // Generate next 5 time slots for today
    for (let i = 0; i < 5; i++) {
      const formattedTime = this.formatTime(nearestSlot);
      const formattedLabel = this.formatLabel(nearestSlot);
      this.pickupTimes.push({ value: formattedTime, label: formattedLabel });
      nearestSlot.setMinutes(nearestSlot.getMinutes() + 15);
    }

    // Generate time slots for the next day
    const nextDaySlots = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM'];
    nextDaySlots.forEach(time => {
      const formattedTime = this.formatNextDayTime(time);
      const formattedLabel = this.formatNextDayLabel(time);
      this.pickupTimes.push({ value: formattedTime, label: formattedLabel });
    });

    this.selectedTime = this.pickupTimes[0].value;
  }

  getNearestSlot(date: Date): Date {
    const nearestSlot = new Date(date);
    nearestSlot.setMilliseconds(0);
    nearestSlot.setSeconds(0);
    nearestSlot.setMinutes(Math.ceil(date.getMinutes() / 15) * 15);

    return nearestSlot;
  }

  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Adjust 0 to 12 for midnight
    const formattedTime = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return formattedTime;
  }

  formatLabel(date: Date): string {
    const dayOfWeek = moment(date).format('dddd');
    const monthDay = moment(date).format('MMMM D');
    const timezone = moment.tz.guess();
    const timeLt = moment(date).format('LT');
    const formattedLabel = `${dayOfWeek} ${monthDay} @ ${timeLt} (${timezone})`;
    return formattedLabel;
  }

  
  formatNextDayTime(time: string): string {
    const tomorrow = moment().add(1, 'day');
    const formattedTime = `${tomorrow.format('YYYY-MM-DD')} ${time}`;
    return formattedTime;
  }

  formatNextDayLabel(time: string): string {
    const tomorrow = moment().add(1, 'day');
    const dayOfWeek = tomorrow.format('dddd');
    const monthDay = tomorrow.format('MMMM D');
    const timezone = moment.tz.guess();
    const formattedLabel = `${dayOfWeek} ${monthDay} @ ${time} (${timezone})`;
    return formattedLabel;
  }

  setDefaultTimezone() {
    const currentTimezone = moment.tz.guess();
    const matchingTimezone = this.timezones.find(tz => tz.value === currentTimezone);
    this.selectedTimezone = matchingTimezone ? matchingTimezone.value : this.timezones[0].value;
  }

  onSubmit() {
    const submissionData = {
      name: this.name,
      email: this.email,
      selectedTime: this.selectedTime,
      timezone: this.selectedTimezone,
      howDidYouHear: this.howDidYouHear
    };

    console.log('Submitting:', submissionData);

    const webhookUrl = 'https://api.michaelthehomebuyer.ca/workshopspujah/webform-podio';
    this.http.post(webhookUrl, submissionData, { observe: 'response' }).subscribe(
        (res: HttpResponse<any>) => {
          console.log('Data successfully sent to webhook', res.status);
          const statusString: string = res.body.status.toString(); 
          const errorMessage = res.body && res.body.message ? res.body.message : 'An error occurred';
         
          if (res.status == 200) {
            setTimeout(() => {
              this.spinner.hide();
              window.open("https://workshop.spujah.com/registersuccess", '_parent');
            }, 1000);
         } else if (res.status == 400) {
          alert(errorMessage);
          location.reload;
            setTimeout(() => {
                this.spinner.hide();
                window.open("https://workshop.spujah.com/registerfailed", '_parent');
            }, 1000);
 
        } else if (res.status == 500) {
          alert(errorMessage);
          location.reload;
            setTimeout(() => {
                this.spinner.hide();
                window.location.reload();
            }, 1000);
 
        }
 
        },
        error => {
          console.error('Error sending data to webhook', error);
          alert("Some error occured. Please try after sometime");
        location.reload;
          setTimeout(() => {
              this.spinner.hide();
              window.location.reload();
          }, 1000);
      
        }
      );
  }
}