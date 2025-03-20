import {Schema, model} from 'mongoose';

export interface IMatchup extends Document {
    name: string;
    votes: number;
}

const matchupSchema = new Schema<IMatchup>({
    name: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
});
const Matchup = model('Matchup', matchupSchema);

export default Matchup;