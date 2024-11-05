import type { ResponseFailure } from '../../shared/domain/ResponseFailure';
import type { ResponseSuccess } from '../../shared/domain/ResponseSuccess';
import type { AuthSuccessDomain, LoginDomain, MeDomain, RegisterDomain } from '../domain/auth-domain';
import type { AuthRepository } from '../domain/auth-repository.domain';
import { request } from '~/utils/http-common';


export function apiAuthRepository(): AuthRepository {

	async function login(data: LoginDomain): Promise<AuthSuccessDomain> {
		return new Promise(async (resolve, reject) => {
			const response = await request(`/api/login`,{
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if(response.ok){
				resolve(await response.json() as AuthSuccessDomain);
			}else{
				reject( await response.json() as ResponseFailure);
			}
		});

	}

	async function me(): Promise<MeDomain> {
		return new Promise(async (resolve, reject) => {
			const response = await request(`/api/me`,{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if(response.ok){
				resolve(await response.json() as MeDomain);
			}else{
				reject( await response.json() as ResponseFailure);
			}
		});
	}

	async function logout(): Promise<ResponseSuccess> {
		return new Promise(async (resolve, reject) => {
			const response = await request(`/api/me`,{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if(response.ok){
				resolve(await response.json() as ResponseSuccess);
			}else{
				reject( await response.json() as ResponseFailure);
			}
		});
	}

	async function register(data: RegisterDomain): Promise<ResponseSuccess> {
		return new Promise(async (resolve, reject) => {
			const response = await request(`/api/register`,{
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if(response.ok){
				resolve(await response.json() as ResponseSuccess);
			}else{
				reject( await response.json() as ResponseFailure);
			}
		});

	}

	return {
		login,
		register,
		logout,
		me,
	};
}