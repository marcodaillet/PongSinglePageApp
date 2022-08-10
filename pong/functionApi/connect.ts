/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   connect.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/04 10:41:36 by mbonnet           #+#    #+#             */
/*   Updated: 2022/08/08 11:41:32 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { DataSource, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import * as model from "./fcForDatabase";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "transandance",
    synchronize: true,
    logging: false,
    entities: [model.Games, model.Raquettes, model.Balls, model.Users, model.Historique],
})