import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
    public ApiIP: string = "http://localhost"
    public ApiPort = '3000';
    public Server: string = this.ApiIP + ':' + this.ApiPort;
    public ServerWithApiUrl = this.Server + '/';
}
