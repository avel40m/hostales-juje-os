export class ProfileDTO {
    constructor(username,email,phone,province,location,city,sector,createdAt,profile){
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.province = province;
        this.location = location;
        this.city = city;
        this.sector = sector;
        this.createdAt = createdAt;
        this.profile = profile;
    }
}